import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import Question from "@/models/Question";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const question = await Question.create(data);
    return NextResponse.json(question, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to create question", error: error.message },
      { status: 500 }
    );
  }
}