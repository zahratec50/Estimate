// import { cookies } from "next/headers";

// export async function POST() {
//   cookies().delete("token");
//   return Response.json({ message: "Logout is done" });
// }


// import { NextResponse } from "next/server";
// import { clearRefreshTokenCookie } from "@/utils/auth";

// export async function POST() {
//   await clearRefreshTokenCookie();
//   return NextResponse.json({ message: "Signed out successfully" });
// }

import { NextResponse } from "next/server";

export async function POST() {
  // پاک کردن refresh token
  const response = NextResponse.json({ message: "Signed out successfully" });
  response.cookies.set({
    name: "refreshToken",
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return response;
}
