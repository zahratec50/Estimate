import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// فرض کنید secret تعریف شده
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const match = cookie.match(/refreshToken=([^;]+)/);
    if (!match) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const token = match[1];
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as {
      userId: string;
      name?: string;
      role?: "user" | "admin";
    };

    // اگر رول در توکن موجود باشد، استفاده می‌کنیم، در غیر این صورت user
    const role = decoded.role || "user";

    return NextResponse.json({
      user: {
        userId: decoded.userId,
        name: decoded.name || null,
        role,
      },
    });
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
