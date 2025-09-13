import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/configs/db";
// import { REFRESH_TOKEN_SECRET }

export async function GET(req: Request) {
  await connectDB(); // اتصال به MongoDB

  try {
    const cookie = req.headers.get("cookie") || "";
    const match = cookie.match(/refreshToken=([^;]+)/);

    if (!match) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const token = match[1];

    // ✅ استفاده از رفرش توکن برای decode
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as {
      userId: string;
    };

    // ✅ گرفتن اطلاعات واقعی یوزر از دیتابیس
    const user = await User.findById(decoded.userId).select(
      "name email avatar role"
    );

    if (!user) return NextResponse.json({ user: null }, { status: 200 });

    return NextResponse.json({
      user: {
        userId: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "/images/avataradmin.png",
      },
    });
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
