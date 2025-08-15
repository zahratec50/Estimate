import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import QuizModel from "@/models/Quiz1";

export async function POST(request: Request) {
  try {
    await connectToDB();

    const body = await request.json();

    const {
      questions,
      preQuizAnswers,
      mainQuizAnswers,
      isRegistered,
      userType,
      projects = [],
      currentProjectId = null,
    } = body;

    // basic validation
    if (!Array.isArray(questions))
      return NextResponse.json({ error: "questions must be an array" }, { status: 400 });
    if (!Array.isArray(preQuizAnswers))
      return NextResponse.json({ error: "preQuizAnswers must be an array" }, { status: 400 });
    if (!Array.isArray(mainQuizAnswers))
      return NextResponse.json({ error: "mainQuizAnswers must be an array" }, { status: 400 });
    if (typeof isRegistered !== "boolean")
      return NextResponse.json({ error: "isRegistered must be boolean" }, { status: 400 });
    if (typeof userType !== "string")
      return NextResponse.json({ error: "userType must be string" }, { status: 400 });
    if (!Array.isArray(projects))
      return NextResponse.json({ error: "projects must be an array" }, { status: 400 });

    const quizDoc = new QuizModel({
      questions,
      preQuizAnswers,
      mainQuizAnswers,
      isRegistered,
      userType,
      projects,
      currentProjectId,
    });

    await quizDoc.save();

    return NextResponse.json({ success: true, message: "✅ Quiz saved successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error saving quiz:", error);
      return NextResponse.json({ error: `Server error: ${error.message}` }, { status: 500 });
    }
    console.error("❌ Unknown error saving quiz:", error);
    return NextResponse.json({ error: "Server error: Unknown error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const quizzes = await QuizModel.find({}).sort({ createdAt: -1 }).limit(50);
    return NextResponse.json(quizzes);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error fetching quizzes:", error);
      return NextResponse.json({ error: `Server error: ${error.message}` }, { status: 500 });
    }
    console.error("❌ Unknown error fetching quizzes:", error);
    return NextResponse.json({ error: "Server error: Unknown error" }, { status: 500 });
  }
}
