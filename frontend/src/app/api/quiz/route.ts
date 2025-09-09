import { NextResponse } from "next/server";
import mainQuizData from "@/data/mainQuizData.json";
import { QuestionItem } from "@/store/useAppStore";

export async function GET() {
  try {
    // داده‌ها را از فایل لوکال می‌گیریم
    const questions: QuestionItem[] = (mainQuizData as unknown as QuestionItem[]).map(
      (q) => ({
        ...q,
        id: typeof q.id === "string" ? q.id : String(q.id), // تبدیل id به string
      })
    );

    return NextResponse.json({ success: true, data: questions }, { status: 200 });
  } catch (err) {
    console.error("Error in /api/quiz:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
