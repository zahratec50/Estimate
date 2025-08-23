import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import Message from "@/models/Message";


export async function POST(req: NextRequest) {
await connectToDB();
const { messageIds, status } = await req.json();
if (!Array.isArray(messageIds) || !status) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
await Message.updateMany({ _id: { $in: messageIds } }, { $set: { status } });
return NextResponse.json({ ok: true });
}