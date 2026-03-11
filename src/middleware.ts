import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Protège uniquement /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const auth = request.cookies.get("admin_auth")?.value;

    if (auth !== process.env.ADMIN_SECRET) {
      // Redirige vers la page de login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
