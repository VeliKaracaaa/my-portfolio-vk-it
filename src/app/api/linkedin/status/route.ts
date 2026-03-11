import { NextResponse } from "next/server";
import { createClient } from "redis";

export async function GET() {
  const redis = createClient({ url: process.env.REDIS_URL });
  try {
    await redis.connect();
    const token = await redis.get("linkedin_token");
    const expiresAt = await redis.get("linkedin_token_expires");

    const isExpired = expiresAt ? Date.now() > Number(expiresAt) : false;
    const connected = !!token && !isExpired;

    return NextResponse.json({ connected });
  } catch {
    return NextResponse.json({ connected: false });
  } finally {
    if (redis.isOpen) await redis.disconnect();
  }
}
