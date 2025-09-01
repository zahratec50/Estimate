import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import User from "@/models/User";

export async function GET() {
  await connectDB();
  const users = await User.find({});
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { name, email, password, role } = await req.json();
    if (!name || !email || !password || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }
    const newUser = await User.create({ name, email, password, role });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await connectDB();
  try {
    const { userId, role, isBanned } = await req.json();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role, isBanned },
      { new: true }
    );
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ message: "Failed to update user" }, { status: 500 });
  }
}
