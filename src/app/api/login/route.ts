import { NextResponse } from "next/server";
import { verifyAdminSecret, createAdminSessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || !verifyAdminSecret(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionToken = createAdminSessionToken();
    const response = NextResponse.json({ success: true });
    
    response.cookies.set(ADMIN_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("[Login API Error] :", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

