"use server";

import { revalidatePath } from "next/cache";
import * as linkedinData from "@/data/linkedin";
import * as postData from "@/data/posts";
import { withSafeAction } from "@/lib/safe-action";

/**
 * ============================================================
 * SERVER ACTIONS — LINKEDIN
 * ============================================================
 */

/**
 * Vérifie si le compte LinkedIn est connecté.
 */
export async function checkLinkedInStatusAction() {
  return withSafeAction("checkLinkedInStatus", async () => {
    const token = await linkedinData.getLinkedinToken();
    return { connected: !!token };
  }, { rateLimit: "standard" });
}

/**
 * Déconnecte le compte LinkedIn.
 */
export async function logoutLinkedInAction() {
  return withSafeAction("logoutLinkedIn", async () => {
    await linkedinData.deleteLinkedinTokens();
    revalidatePath("/admin");
    return { success: true };
  }, { rateLimit: "standard" });
}

/**
 * Publie un post existant sur LinkedIn.
 */
export async function publishToLinkedInAction(postId: string) {
  return withSafeAction("publishToLinkedIn", async () => {
    // 1. Récupérer le post depuis Postgres (DAL)
    const allPosts = await postData.getAllPosts();
    const post = allPosts.find(p => p.id === postId);

    if (!post) {
      throw new Error("Post introuvable.");
    }

    // 2. Récupérer les tokens (DAL)
    const tokenData = await linkedinData.getLinkedinToken();
    if (!tokenData) {
      throw new Error("LinkedIn non connecté.");
    }

    const { accessToken: token, userUrn } = tokenData;

    let imageUrn: string | null = null;
    let videoUrn: string | null = null;

    // 3. Upload image vers LinkedIn si présente
    if (post.imageUrl && post.imageType) {
      const imageRes = await fetch(post.imageUrl);
      const imageBuffer = await imageRes.arrayBuffer();

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
        }
      );
      
      const registerData = await registerRes.json();
      const uploadUrl = registerData?.value?.uploadMechanism?.["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"]?.uploadUrl;
      imageUrn = registerData?.value?.asset;

      if (uploadUrl && imageUrn) {
        await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": post.imageType,
          },
          body: Buffer.from(imageBuffer),
        });
      }
    }

    // 4. Upload vidéo vers LinkedIn si présente
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
        }
      );
      const initData = await initRes.json();
      const videoUploadUrl = initData?.value?.uploadMechanism?.["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"]?.uploadUrl;
      videoUrn = initData?.value?.asset;

      if (videoUploadUrl && videoUrn) {
        const videoFileRes = await fetch(post.videoUrl);
        const videoBuffer = await videoFileRes.arrayBuffer();
        await fetch(videoUploadUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "video/mp4",
          },
          body: Buffer.from(videoBuffer),
        });
      }
    }

    // 5. Préparation du texte (avec lien PDF si présent)
    const postText = post.documentUrl
      ? `${post.content}\n\n📄 ${post.documentName || "Document"} : ${post.documentUrl}`
      : post.content;

    const mediaUrn = imageUrn || videoUrn;
    const mediaCategory = imageUrn ? "IMAGE" : videoUrn ? "VIDEO" : "NONE";

    // 6. Publication finale
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
      console.error("Erreur LinkedIn API:", linkedInData);
      throw new Error("Erreur lors de la publication sur LinkedIn.");
    }

    // 7. Mettre à jour le post dans Postgres (DAL)
    await linkedinData.markPostAsPublished(postId, linkedInData.id);

    revalidatePath("/admin");
    revalidatePath("/blog");

    return { success: true, linkedInPostId: linkedInData.id };
  }, { rateLimit: "strict" });
}
