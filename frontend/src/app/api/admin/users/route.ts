import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import { User } from "@/models/admin/User";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const users = await User.find({ role: "user" }).sort({ lastSeen: -1 });
    return NextResponse.json(users.map(u => ({
      _id: u._id,
      name: u.name || "Unknown",
      avatar: u.avatar || "/avatars/default.png",
      lastSeen: u.lastSeen,
    })));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
