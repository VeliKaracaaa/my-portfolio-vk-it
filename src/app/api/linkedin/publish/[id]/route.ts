import { NextResponse } from "next/server";
import { createClient } from "redis";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const redis = createClient({ url: process.env.REDIS_URL });
  try {
    await redis.connect();

    const raw = await redis.get(`post:${id}`);
    if (!raw) {
      return NextResponse.json({ error: "Post introuvable" }, { status: 404 });
    }
    const post = JSON.parse(raw);

    const token = await redis.get("linkedin_token");
    const userUrn = await redis.get("linkedin_user_urn");

    if (!token || !userUrn) {
      return NextResponse.json(
        { error: "LinkedIn non connecté." },
        { status: 401 },
      );
    }

    let imageUrn: string | null = null;
    let videoUrn: string | null = null;

    // ── Upload image ──────────────────────────────────────────────
    if (post.imageBase64 && post.imageType) {
      const registerRes = await fetch(
        "https://api.linkedin.com/v2/assets?action=registerUpload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "X-Restli-Protocol-Version": "2.0.0",
          },
          body: JSON.stringify({
            registerUploadRequest: {
              recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
              owner: userUrn,
              serviceRelationships: [
                {
                  relationshipType: "OWNER",
                  identifier: "urn:li:userGeneratedContent",
                },
              ],
            },
          }),
        },
      );
      const registerData = await registerRes.json();
      console.log("Image register:", JSON.stringify(registerData));

      const uploadUrl =
        registerData?.value?.uploadMechanism?.[
          "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
        ]?.uploadUrl;
      imageUrn = registerData?.value?.asset;

      if (uploadUrl && imageUrn) {
        const imageBuffer = Buffer.from(post.imageBase64, "base64");
        await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": post.imageType,
          },
          body: imageBuffer,
        });
      }
    }

    // ── Upload vidéo ──────────────────────────────────────────────
    if (post.videoUrl) {
      const initRes = await fetch(
        "https://api.linkedin.com/v2/assets?action=registerUpload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "X-Restli-Protocol-Version": "2.0.0",
          },
          body: JSON.stringify({
            registerUploadRequest: {
              recipes: ["urn:li:digitalmediaRecipe:feedshare-video"],
              owner: userUrn,
              serviceRelationships: [
                {
                  relationshipType: "OWNER",
                  identifier: "urn:li:userGeneratedContent",
                },
              ],
            },
          }),
        },
      );
      const initData = await initRes.json();
      console.log("Video register:", JSON.stringify(initData));

      const videoUploadUrl =
        initData?.value?.uploadMechanism?.[
          "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
        ]?.uploadUrl;
      videoUrn = initData?.value?.asset;

      if (videoUploadUrl && videoUrn) {
        const videoRes = await fetch(post.videoUrl);
        const videoBuffer = await videoRes.arrayBuffer();
        await fetch(videoUploadUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "video/mp4",
          },
          body: videoBuffer,
        });
      }
    }

    // ── Document PDF : ajouté comme lien dans le texte ────────────
    // LinkedIn ne permet pas feedshare-document aux devs indépendants
    // On ajoute l'URL directement dans le contenu du post
    const postText = post.documentUrl
      ? `${post.content}\n\n📄 ${post.documentName || "Document"} : ${post.documentUrl}`
      : post.content;

    // ── Détermine le type de média ────────────────────────────────
    const mediaUrn = imageUrn || videoUrn;
    const mediaCategory = imageUrn ? "IMAGE" : videoUrn ? "VIDEO" : "NONE";

    // ── Publie le post ────────────────────────────────────────────
    const body = {
      author: userUrn,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text: postText },
          shareMediaCategory: mediaCategory,
          ...(mediaUrn && {
            media: [
              {
                status: "READY",
                description: { text: "" },
                media: mediaUrn,
                title: { text: "" },
              },
            ],
          }),
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    };

    const linkedInRes = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify(body),
    });

    const linkedInData = await linkedInRes.json();

    if (!linkedInRes.ok) {
      console.error("Erreur LinkedIn:", linkedInData);
      return NextResponse.json(
        { error: "Erreur LinkedIn", details: linkedInData },
        { status: 500 },
      );
    }

    const updatedPost = {
      ...post,
      publishedToLinkedIn: true,
      linkedInPostId: linkedInData.id,
      publishedAt: new Date().toISOString(),
    };
    await redis.set(`post:${id}`, JSON.stringify(updatedPost));

    return NextResponse.json({
      success: true,
      linkedInPostId: linkedInData.id,
    });
  } catch (error) {
    console.error("Erreur publication:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  } finally {
    if (redis.isOpen) await redis.disconnect();
  }
}
