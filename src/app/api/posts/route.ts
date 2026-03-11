import { NextResponse } from "next/server";
import { createClient } from "redis";

function getRedisClient() {
  return createClient({ url: process.env.REDIS_URL });
}

// GET /api/posts — récupère tous les posts
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

// POST /api/posts — crée un post
export async function POST(request: Request) {
  const { content } = await request.json();
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
    };
    await redis.set(`post:${id}`, JSON.stringify(post));
    return NextResponse.json({ post });
  } finally {
    await redis.disconnect();
  }
}
