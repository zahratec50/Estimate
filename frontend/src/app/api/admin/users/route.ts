import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import { User } from "@/models/admin/User";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
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
