// import { cookies } from "next/headers";

// export async function POST() {
//   cookies().delete("token");
//   return Response.json({ message: "Logout is done" });
// }


import { NextResponse } from "next/server";
import { clearRefreshTokenCookie } from "@/utils/auth";

export async function POST() {
  await clearRefreshTokenCookie();
  return NextResponse.json({ message: "Signed out successfully" });
}
