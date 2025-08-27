import { NextResponse } from 'next/server';
export async function GET() {
// Return mock online ids
return NextResponse.json({ onlineUserIds: [] });
}