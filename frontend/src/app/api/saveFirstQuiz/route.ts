import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import QuizModel from "@/models/Quiz1";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    console.log("📥 Received FirstQuiz body:", body);

    const { questions, preQuizAnswers, isRegistered, userType } = body;

    // ✅ اعتبارسنجی مخصوص FirstQuiz
    if (
      !Array.isArray(questions) ||
      !Array.isArray(preQuizAnswers) ||
      typeof isRegistered !== "boolean" ||
      typeof userType !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid input data for FirstQuiz" },
        { status: 400 }
      );
    }

    const quizDoc = new QuizModel({
      questions,
      preQuizAnswers,
      isRegistered,
      userType,
    });

    await quizDoc.save();

    return NextResponse.json({
      success: true,
      message: "✅ FirstQuiz saved successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error saving FirstQuiz:", error);
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
    const quizzes = await QuizModel.find({ preQuizAnswers: { $exists: true } })
      .sort({ createdAt: -1 })
      .limit(50);
    return NextResponse.json(quizzes);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error fetching FirstQuiz:", error);
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
