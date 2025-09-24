import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import Message from "@/models/Message";
import { cookies } from "next/headers";
import { verifyRefreshToken } from "@/utils/auth";

export async function POST(req: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("refreshToken")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const payload = verifyRefreshToken(token);
    if (!payload) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const { conversationId, content, attachments, receiverId } = data;

    if (!conversationId || !content) {
      return NextResponse.json(
        { message: "conversationId and content are required" },
        { status: 400 }
      );
    }

    // اگر receiverId فرستاده نشده، آن را از conversationId محاسبه کن
    let finalReceiverId = receiverId;
    if (!finalReceiverId) {
      const members = conversationId.split("-");
      finalReceiverId = members.find((id: string) => id !== payload.userId);
      if (!finalReceiverId) {
        return NextResponse.json(
          { message: "Cannot determine receiverId" },
          { status: 400 }
        );
      }
    }

    const newMessage = await Message.create({
      conversationId,
      senderId: payload.userId,
      senderName: payload.email || "Unknown", // یا هر فیلدی که اسم کاربر را نشان دهد
      receiverId: finalReceiverId,
      content,
      attachments: attachments || [],
      createdAt: new Date(),
      status: "sent",
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (err: any) {
    console.error("POST /chat/send error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

