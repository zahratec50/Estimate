import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/dashboard", "/admin"];
  const needAuth = protectedRoutes.some((r) => pathname.startsWith(r));
  if (!needAuth) return NextResponse.next();

  const refreshToken = req.cookies.get("refreshToken")?.value;
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  try {
    const secret = new TextEncoder().encode(REFRESH_TOKEN_SECRET);
    const { payload } = await jwtVerify(refreshToken, secret);

    // @ts-ignore
    const role = payload.role as string | undefined;

    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
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
