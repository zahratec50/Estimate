import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import Conversation from "@/models/Conversation";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ error: "userId is required" }, { status: 400 });

  const conversations = await Conversation.find({ members: userId }).sort({ lastMessageAt: -1 });
  return NextResponse.json(conversations);
}
