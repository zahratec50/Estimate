import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import Message from "@/models/Message";
import { getUserFromRefreshToken } from "@/utils/getUserFromRefreshToken";

export async function POST(req: Request, { params }: { params: Promise<{ conversationId: string }> }) {
  await connectDB();
  try {
    const userData = await getUserFromRefreshToken();
    if (!userData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { conversationId } = await params;
    if (!conversationId) {
      return NextResponse.json({ message: "Missing conversationId" }, { status: 400 });
    }

    // set messages not sent by this user to seen
    await Message.updateMany(
      { conversationId, senderId: { $ne: userData.userId }, status: { $ne: "seen" } },
      { status: "seen" }
    );

    return NextResponse.json({ message: "Seen updated" }, { status: 200 });
  } catch (err: any) {
    console.error("Seen update error:", err);
    return NextResponse.json({ message: "Internal server error", error: err.message }, { status: 500 });
  }
}
