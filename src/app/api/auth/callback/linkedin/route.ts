import { NextResponse } from "next/server";
import { createClient } from "redis";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const baseUrl = new URL(request.url).origin;

  if (!code) {
    return NextResponse.redirect(`${baseUrl}/admin?error=no_code`);
  }

  const redis = createClient({ url: process.env.REDIS_URL });
  try {
    const tokenRes = await fetch(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          client_id: process.env.LINKEDIN_CLIENT_ID!,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
          redirect_uri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI!,
        }),
      },
    );

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      console.error("Erreur token:", tokenData);
      return NextResponse.redirect(`${baseUrl}/admin?error=token_failed`);
    }

    const userRes = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "LinkedIn-Version": "202304",
      },
    });
    const userData = await userRes.json();
    console.log("USERINFO:", JSON.stringify(userData));

    if (!userData.sub) {
      console.error("Pas de sub:", userData);
      return NextResponse.redirect(`${baseUrl}/admin?error=no_user_id`);
    }

    const userUrn = `urn:li:person:${userData.sub}`;

    await redis.connect();
    await redis.set("linkedin_token", tokenData.access_token);
    await redis.set("linkedin_user_urn", userUrn);

    if (tokenData.expires_in) {
      await redis.set(
        "linkedin_token_expires",
        String(Date.now() + tokenData.expires_in * 1000),
      );
    }

    return NextResponse.redirect(`${baseUrl}/admin?success=linkedin_connected`);
  } catch (error) {
    console.error("Erreur callback:", error);
    return NextResponse.redirect(`${baseUrl}/admin?error=server_error`);
  } finally {
    if (redis.isOpen) await redis.disconnect();
  }
}
