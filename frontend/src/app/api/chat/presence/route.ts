import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import Role from "@/models/Role";


export async function POST(req: NextRequest) {
await connectToDB();
const { userId, status } = await req.json();
if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });
const update: any = { lastSeen: new Date() };
if (status) update.status = status;
await Role.findByIdAndUpdate(userId, update);
return NextResponse.json({ ok: true });
}