import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { generateAccessToken } from "@/utils/auth";
import User from "@/models/User";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: "No refresh token" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { userId: string };

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const newAccessToken = generateAccessToken({ userId: user._id.toString(), role: user.role });
    return NextResponse.json({ accessToken: newAccessToken });
  } catch (error) {
    return NextResponse.json({ message: "Invalid or expired refresh token" }, { status: 403 });
  }
}