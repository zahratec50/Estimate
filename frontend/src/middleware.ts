import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

interface JwtPayload {
  userId?: string;
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/dashboard", "/admin"];
  const needAuth = protectedRoutes.some((r) => pathname.startsWith(r));
  if (!needAuth) return NextResponse.next();

  const refreshToken = req.cookies.get("refreshToken")?.value;
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  try {
    const decoded = verify(refreshToken, REFRESH_TOKEN_SECRET) as JwtPayload;
    console.log("Decoded refresh token in middleware:", decoded);

    if (pathname.startsWith("/admin")) {
      if (!decoded.role || decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Middleware verify error:", err);
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
