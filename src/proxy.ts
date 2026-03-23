import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  const secret = process.env.ADMIN_SECRET;
  const adminAuth = request.cookies.get("admin_auth")?.value;

  // 1. Protection des pages /admin
  if (pathname.startsWith("/admin")) {
    if (!adminAuth || !secret || adminAuth !== secret) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 2. Protection des routes API sensibles (sauf GET et login)
  if (pathname.startsWith("/api") && method !== "GET" && pathname !== "/api/login") {
    if (!adminAuth || !secret || adminAuth !== secret) {
      // On utilise l'API standard Response.json disponible dans le Edge Runtime
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
