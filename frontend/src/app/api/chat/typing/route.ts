import { NextResponse } from "next/server";
import {getUserFromRefreshToken}  from "@/utils/getUserFromRefreshToken";

export async function POST(req: Request) {
  try {
    const userData = await getUserFromRefreshToken();
    if (!userData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { conversationId, userId, isTyping } = await req.json();

    // برای تایپینگ، می‌تونی تو Redis یا یه cache ذخیره کنی
    // فعلاً فقط پاسخ می‌ده
    return NextResponse.json({ message: "Typing updated" });
  } catch (error: any) {
    console.error("Typing update error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}