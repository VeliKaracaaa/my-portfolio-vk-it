import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.LINKEDIN_CLIENT_ID!;
  const redirectUri = encodeURIComponent(
    process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI!,
  );
  const scope = encodeURIComponent("openid profile w_member_social");

  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

  return NextResponse.redirect(authUrl);
}
