
import { NextResponse } from "next/server";
import { clearRefreshTokenCookie } from "@/utils/auth";

export async function POST() {
  try {
    await clearRefreshTokenCookie();
    return NextResponse.json({ message: "Refresh token cleared successfully" });
  } catch (error: any) {
    console.error("Clear refresh token error:", error);
    return NextResponse.json(
      { message: "Failed to clear refresh token", error: error.message },
      { status: 500 }
    );
  }
}