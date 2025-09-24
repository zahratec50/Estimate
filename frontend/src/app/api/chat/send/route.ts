import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import Message from "@/models/Message";
import { verifyRefreshToken } from "@/utils/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("refreshToken")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const payload = verifyRefreshToken(token);
    if (!payload)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const { conversationId, senderId, receiverId, content } = data;
    if (!conversationId || !content || !receiverId)
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    const newMessage = await Message.create({
      conversationId,
      senderId,
      senderName: payload.email || "Unknown",
      receiverId,
      content,
      createdAt: new Date(),
      status: "sent",
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (err: any) {
    console.error("POST /chat/send error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
