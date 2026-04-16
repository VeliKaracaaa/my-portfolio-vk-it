import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
import path from "path";

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function testConnection() {
  console.log("Testing Redis connection...");
  console.log("URL:", process.env.KV_REST_API_URL ? "Defined" : "MISSING");
  
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    console.error("Error: KV environment variables are not loaded properly.");
    process.exit(1);
  }

  const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });

  try {
    const res = await redis.ping();
    console.log("Redis Ping Result:", res);
    console.log("Connection successful! ✅");
  } catch (err) {
    console.error("Redis Connection Failed: ❌", err);
  }
}

testConnection();
