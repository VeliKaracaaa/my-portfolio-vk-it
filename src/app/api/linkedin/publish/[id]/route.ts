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
        {
          error:
            "LinkedIn non connecté. Va sur /admin pour connecter LinkedIn.",
        },
        { status: 401 },
      );
    }

    const linkedInRes = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify({
        author: userUrn,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: {
              text: post.content,
            },
            shareMediaCategory: "NONE",
          },
        },
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
        },
      }),
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
