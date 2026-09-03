import { NextResponse } from "next/server";
import crypto from "node:crypto";

export async function GET() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const redirectUriRaw = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI;

  if (!clientId || !redirectUriRaw) {
    return NextResponse.json(
      { error: "LinkedIn OAuth configuration manquante (CLIENT_ID ou REDIRECT_URI)." },
      { status: 500 }
    );
  }

  const state = crypto.randomUUID();
  const redirectUri = encodeURIComponent(redirectUriRaw);
  const scope = encodeURIComponent("openid profile w_member_social");

  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

  const response = NextResponse.redirect(authUrl);
  response.cookies.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
    sameSite: "lax",
  });

  return response;
}

