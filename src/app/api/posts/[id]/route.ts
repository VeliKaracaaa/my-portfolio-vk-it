// import { NextResponse } from "next/server";
// import { createClient } from "redis";

// export async function DELETE(
//   _request: Request,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   const { id } = await params;
//   const redis = createClient({ url: process.env.REDIS_URL });
//   try {
//     await redis.connect();

//     // 1. Récupère le post avant de le supprimer
//     const raw = await redis.get(`post:${id}`);
//     if (!raw) {
//       return NextResponse.json({ error: "Post introuvable" }, { status: 404 });
//     }
//     const post = JSON.parse(raw);

//     // 2. Si publié sur LinkedIn → le supprimer là-bas aussi
//     if (post.publishedToLinkedIn && post.linkedInPostId) {
//       const token = await redis.get("linkedin_token");

//       if (token) {
//         const linkedInRes = await fetch(
//           `https://api.linkedin.com/v2/ugcPosts/${encodeURIComponent(post.linkedInPostId)}`,
//           {
//             method: "DELETE",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "X-Restli-Protocol-Version": "2.0.0",
//             },
//           },
//         );

//         if (!linkedInRes.ok) {
//           const err = await linkedInRes.json().catch(() => ({}));
//           console.error("Erreur suppression LinkedIn:", err);
//           // On continue quand même
//         } else {
//           console.log("Post supprimé de LinkedIn ✅");
//         }
//       }
//     }

//     // 3. Supprime de Redis (toujours, quoi qu'il arrive)
//     await redis.del(`post:${id}`);

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Erreur suppression:", error);
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   } finally {
//     if (redis.isOpen) await redis.disconnect();
//   }
// }

import { NextResponse } from "next/server";
import { createClient } from "redis";

export async function DELETE(
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

    if (post.publishedToLinkedIn && post.linkedInPostId) {
      const token = await redis.get("linkedin_token");
      if (token) {
        const linkedInRes = await fetch(
          `https://api.linkedin.com/v2/ugcPosts/${encodeURIComponent(post.linkedInPostId)}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Restli-Protocol-Version": "2.0.0",
            },
          },
        );
        if (!linkedInRes.ok) {
          const err = await linkedInRes.json().catch(() => ({}));
          console.error("Erreur suppression LinkedIn:", err);
        }
      }
    }

    await redis.del(`post:${id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur suppression:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  } finally {
    if (redis.isOpen) await redis.disconnect();
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { content } = await request.json();

  if (!content?.trim()) {
    return NextResponse.json({ error: "Contenu vide" }, { status: 400 });
  }

  const redis = createClient({ url: process.env.REDIS_URL });
  try {
    await redis.connect();
    const raw = await redis.get(`post:${id}`);
    if (!raw) {
      return NextResponse.json({ error: "Post introuvable" }, { status: 404 });
    }

    const post = JSON.parse(raw);
    const updatedPost = {
      ...post,
      content: content.trim(),
      updatedAt: new Date().toISOString(),
    };

    await redis.set(`post:${id}`, JSON.stringify(updatedPost));
    return NextResponse.json({ post: updatedPost });
  } catch (error) {
    console.error("Erreur modification:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  } finally {
    if (redis.isOpen) await redis.disconnect();
  }
}
