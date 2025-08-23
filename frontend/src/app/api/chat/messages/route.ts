import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import Message from "@/models/Message";
import Conversation from "@/models/Conversation";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");
    if (!conversationId) {
      return NextResponse.json({ error: "conversationId required" }, { status: 400 });
    }
    await connectToDB();
    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 }).lean();
    return NextResponse.json(messages, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { conversationId, senderId, receiverId, content } = await req.json();
    if (!conversationId || !senderId || !receiverId || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    await connectToDB();

    // ensure conversation exists (safety)
    const conv = await Conversation.findById(conversationId);
    if (!conv) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    const msg = await Message.create({
      conversationId,
      senderId,
      receiverId,
      content: String(content).trim(),
      status: "sent",
      createdAt: new Date(),
    });

    conv.lastMessageAt = new Date();
    await conv.save();

    return NextResponse.json(msg, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
