import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}).select("name email role phone avatar lastSeen");
    const userDTOs = users.map((user) => ({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || undefined,
      avatarUrl: user.avatar || "/images/user.png",
      status: user.lastSeen > new Date(Date.now() - 5 * 60 * 1000) ? "online" : "offline",
      lastSeen: user.lastSeen.toISOString(),
    }));

    return NextResponse.json(userDTOs, { status: 200 });
  } catch (err: any) {
    console.error("GET /admin/users error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
