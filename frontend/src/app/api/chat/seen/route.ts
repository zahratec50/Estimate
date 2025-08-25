// app/api/chat/seen/route.ts
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { conversationId, userId } = body;

  // فقط mock، کاری با دیتابیس نداریم
  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
