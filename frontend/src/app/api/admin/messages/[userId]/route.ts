import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import Message from "@/models/Message";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    await connectDB();
    const { userId } = params;
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).sort({ createdAt: 1 });
    return NextResponse.json(messages);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    await connectDB();
    const { userId } = params;
    const body = await req.json();
    const { content } = body;
    if (!content) return NextResponse.json({ error: "Message content is required" }, { status: 400 });

    const message = await Message.create({
      senderId: "admin",
      receiverId: userId,
      content,
      status: "delivered",
    });

    return NextResponse.json(message);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
