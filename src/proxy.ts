import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from "./lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  const adminAuth = request.cookies.get(ADMIN_COOKIE_NAME)?.value?.trim();
  const isAuthenticated = verifyAdminSessionToken(adminAuth);

  // 1. Pages publiques et routes d'authentification exemptées
  if (
    pathname === "/login" ||
    pathname === "/api/login" ||
    pathname.startsWith("/api/auth/callback") ||
    pathname.startsWith("/api/linkedin/auth")
  ) {
    return NextResponse.next();
  }

  // 2. Protection des pages /admin
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 3. Protection des routes API sensibles (sauf GET publics)
  if (pathname.startsWith("/api") && method !== "GET") {
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};

