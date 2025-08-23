import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import Conversation from "@/models/Conversation";

// POST { members: [userId, adminId] } => ensure & return conversation
export async function POST(req: NextRequest) {
  try {
    const { members } = await req.json();
    if (!Array.isArray(members) || members.length !== 2) {
      return NextResponse.json({ error: "members must be [userId, adminId]" }, { status: 400 });
    }
    await connectToDB();
    let conv = await Conversation.findOne({ members: { $all: members } });
    if (!conv) {
      conv = await Conversation.create({ members, lastMessageAt: new Date() });
    }
    return NextResponse.json(conv, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to ensure conversation" }, { status: 500 });
  }
}
