import { NextResponse } from "next/server";
import { createClient } from "redis";
import { put } from "@vercel/blob";

function getRedisClient() {
  return createClient({ url: process.env.REDIS_URL });
}

export async function GET() {
  const redis = getRedisClient();
  try {
    await redis.connect();
    const keys = await redis.keys("post:*");
    const posts = await Promise.all(
      keys.map(async (key) => {
        const raw = await redis.get(key);
        return raw ? JSON.parse(raw) : null;
      }),
    );
    const sorted = posts
      .filter(Boolean)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    return NextResponse.json({ posts: sorted });
  } finally {
    await redis.disconnect();
  }
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  let content = "";
  let imageBase64: string | null = null;
  let imageType: string | null = null;
  let videoUrl: string | null = null;
  let documentUrl: string | null = null;
  let documentName: string | null = null;

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    content = formData.get("content") as string;

    // Image → stockée en Base64 dans Redis (taille raisonnable)
    const image = formData.get("image") as File | null;
    if (image && image.size > 0) {
      const buffer = await image.arrayBuffer();
      imageBase64 = Buffer.from(buffer).toString("base64");
      imageType = image.type;
    }

    // Vidéo → uploadée côté client via /api/blob/upload
    // On reçoit ici uniquement l'URL (quelques octets, pas de limite 413)
    const videoUrlFromForm = formData.get("videoUrl") as string | null;
    if (videoUrlFromForm) {
      videoUrl = videoUrlFromForm;
    }

    // PDF → uploadé côté client via /api/blob/upload
    // On reçoit ici uniquement l'URL et le nom
    const documentUrlFromForm = formData.get("documentUrl") as string | null;
    const documentNameFromForm = formData.get("documentName") as string | null;
    if (documentUrlFromForm) {
      documentUrl = documentUrlFromForm;
      documentName = documentNameFromForm;
    }

    // Fallback : si la vidéo/PDF est envoyée directement (ex: en local sans client upload)
    const video = formData.get("video") as File | null;
    if (video && video.size > 0 && !videoUrl) {
      const blob = await put(`videos/${Date.now()}-${video.name}`, video, {
        access: "public",
      });
      videoUrl = blob.url;
    }

    const document = formData.get("document") as File | null;
    if (document && document.size > 0 && !documentUrl) {
      const blob = await put(
        `documents/${Date.now()}-${document.name}`,
        document,
        { access: "public" },
      );
      documentUrl = blob.url;
      documentName = document.name;
    }
  } else {
    const json = await request.json();
    content = json.content;
  }

  if (!content?.trim()) {
    return NextResponse.json({ error: "Contenu vide" }, { status: 400 });
  }

  const redis = getRedisClient();
  try {
    await redis.connect();
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const post = {
      id,
      content: content.trim(),
      createdAt: new Date().toISOString(),
      publishedToLinkedIn: false,
      ...(imageBase64 && { imageBase64, imageType }),
      ...(videoUrl && { videoUrl }),
      ...(documentUrl && { documentUrl, documentName }),
    };
    await redis.set(`post:${id}`, JSON.stringify(post));
    return NextResponse.json({ post });
  } finally {
    await redis.disconnect();
  }
}
