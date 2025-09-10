import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import QuizModel from "@/models/Quiz1";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    console.log("📥 Received MainQuiz body:", body);

    const {
      questions,
      mainQuizAnswers,
      isRegistered,
      userType,
      projects = [],
      currentProjectId = null,
    } = body;

    // ✅ اعتبارسنجی مخصوص MainQuiz
    if (
      !Array.isArray(questions) ||
      !Array.isArray(mainQuizAnswers) ||
      typeof isRegistered !== "boolean" ||
      typeof userType !== "string" ||
      !Array.isArray(projects)
    ) {
      return NextResponse.json(
        { error: "Invalid input data for MainQuiz" },
        { status: 400 }
      );
    }

    // فرمت پاسخ‌ها
    const formattedMainQuizAnswers = mainQuizAnswers.map((a: any) => ({
      question: a.question,
      answer: Array.isArray(a.answer) ? a.answer : [a.answer],
    }));

    const quizDoc = new QuizModel({
      questions,
      mainQuizAnswers: formattedMainQuizAnswers,
      isRegistered,
      userType,
      projects,
      currentProjectId,
    });

    await quizDoc.save();

    return NextResponse.json({
      success: true,
      message: "✅ MainQuiz saved successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error saving MainQuiz:", error);
      return NextResponse.json(
        { error: `Server error: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Server error: Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const quizzes = await QuizModel.find({ mainQuizAnswers: { $exists: true } })
      .sort({ createdAt: -1 })
      .limit(50);
    return NextResponse.json(quizzes);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error fetching MainQuiz:", error);
      return NextResponse.json(
        { error: `Server error: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Server error: Unknown error" },
      { status: 500 }
    );
  }
}
