import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import Message from "@/models/Message";
import { cookies } from "next/headers";
import { verifyRefreshToken } from "@/utils/auth";

interface Params {
  params: Promise<{ conversationId: string }>;
}

export async function GET(req: Request, { params }: Params) {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("refreshToken")?.value;

    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const payload = verifyRefreshToken(token);
    if (!payload) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { conversationId } = await params;
    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
    return NextResponse.json(messages, { status: 200 });
  } catch (err: any) {
    console.error("GET /chat/messages error:", err.message);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
