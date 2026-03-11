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
    await redis.del(`post:${id}`);
    return NextResponse.json({ success: true });
  } finally {
    if (redis.isOpen) await redis.disconnect();
  }
}
