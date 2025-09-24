// src/utils/getUserFromRefreshToken.ts
import { cookies } from "next/headers";
import { verifyRefreshToken, JwtPayloadExtended } from "@/utils/auth";

export async function getUserFromRefreshToken(): Promise<JwtPayloadExtended | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("refreshToken")?.value;
    if (!token) return null;
    return verifyRefreshToken(token);
  } catch (err) {
    console.error("getUserFromRefreshToken error ->", err);
    return null;
  }
}
