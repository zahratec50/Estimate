import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/configs/db";
import {
  generateAccessToken,
  generateRefreshToken,
  setRefreshTokenCookie,
} from "@/utils/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    // اعتبارسنجی اولیه
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // بررسی اینکه کاربر با این ایمیل وجود دارد یا خیر
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // تعیین رول: اگر اولین کاربر است => admin، وگرنه user
    const isFirstUser = (await User.countDocuments()) === 0;
    const role = isFirstUser ? "admin" : "user";

    // هش کردن پسورد
    const hashedPassword = await bcrypt.hash(password, 10);

    // ایجاد کاربر
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role, // رول ست شد
    });

    // ساخت توکن‌ها
    const accessToken = generateAccessToken({ userId: user._id.toString(), role: user.role });
    const refreshToken = generateRefreshToken({ userId: user._id.toString(), role: user.role });

    // ست کردن کوکی ریفرش توکن
    await setRefreshTokenCookie(refreshToken);

    // پاسخ به کلاینت
    return NextResponse.json({
      message: "User registered successfully",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // برگرداندن رول کاربر
      },
    });
  } catch (error: any) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { message: "Signup failed", error: error.message },
      { status: 500 }
    );
  }
}
