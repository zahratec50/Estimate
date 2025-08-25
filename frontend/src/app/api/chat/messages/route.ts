import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/configs/db"
import Message from "@/models/Message";
import Conversation from "@/models/Conversation";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get("conversationId");

  if (!conversationId) return NextResponse.json({ error: "conversationId is required" }, { status: 400 });

  const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const { conversationId, senderId, receiverId, content } = await req.json();

  if (!conversationId || !senderId || !receiverId || !content) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  // ذخیره پیام
  const message = await Message.create({ conversationId, senderId, receiverId, content, createdAt: new Date(), status: "sent" });

  // آپدیت تاریخ آخرین پیام در کانورسیشن
  await Conversation.findOneAndUpdate({ _id: conversationId }, { lastMessageAt: new Date() });

  return NextResponse.json(message);
}
