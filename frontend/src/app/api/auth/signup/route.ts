import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/configs/db";
import { generateAccessToken, generateRefreshToken, setRefreshTokenCookie } from "@/utils/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();
    console.log('heloo');
    

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    await setRefreshTokenCookie(refreshToken);

    return NextResponse.json({
      message: "User registered successfully",
      accessToken,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error: any) {
    return NextResponse.json({ message: "Signup failed", error: error.message }, { status: 500 });
  }
}