import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import QuizModel from "@/models/Quiz1";

export async function POST(request: Request) {
  try {
    await connectToDB();

    const body = await request.json();
    console.log("Received body:", body);

    // اعتبارسنجی داده‌ها
    const {
      questions,
      preQuizAnswers,
      mainQuizAnswers,
      isRegistered,
      userType,
      projects,
      currentProjectId,
    } = body;

    if (
      !Array.isArray(questions) ||
      !Array.isArray(preQuizAnswers) ||
      !Array.isArray(mainQuizAnswers) ||
      typeof isRegistered !== "boolean" ||
      typeof userType !== "string" ||
      !Array.isArray(projects)
    ) {
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
    }

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

    return NextResponse.json({
      success: true,
      message: "Quiz saved successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error saving quiz:", {
        error,
        message: error.message,
        stack: error.stack,
      });
      return NextResponse.json({ error: `Server error: ${error.message}` }, { status: 500 });
    } else {
      console.error("Unknown error saving quiz:", error);
      return NextResponse.json({ error: "Server error: Unknown error" }, { status: 500 });
    }
  }
}

export async function GET() {
  try {
    await connectToDB();
    const quizzes = await QuizModel.find({});
    return NextResponse.json(quizzes);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching quizzes:", {
        error,
        message: error.message,
        stack: error.stack,
      });
      return NextResponse.json({ error: `Server error: ${error.message}` }, { status: 500 });
    } else {
      console.error("Unknown error fetching quizzes:", error);
      return NextResponse.json({ error: "Server error: Unknown error" }, { status: 500 });
    }
  }
}