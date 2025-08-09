// import type { NextApiRequest, NextApiResponse } from "next";
// import connectToDB from "@/configs/db";
// import QuizModel from "@/models/Quiz1";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     await connectToDB();

//     const { preQuizAnswers, mainQuizAnswers, isRegistered, userType, projects, currentProjectId } = req.body;

//     if (
//       !Array.isArray(preQuizAnswers) ||
//       !Array.isArray(mainQuizAnswers) ||
//       typeof isRegistered !== "boolean" ||
//       typeof userType !== "string" ||
//       !Array.isArray(projects)
//     ) {
//       return res.status(400).json({ error: "Invalid input data" });
//     }

//     const quizDoc = new QuizModel({
//       preQuizAnswers,
//       mainQuizAnswers,
//       isRegistered,
//       userType,
//       projects,
//       currentProjectId,
//     });

//     await quizDoc.save();

//     res.status(200).json({ success: true, message: "Quiz saved successfully" });
//   } catch (error) {
//     console.error("Error saving quiz:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// }

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
      preQuizAnswers,
      mainQuizAnswers,
      isRegistered,
      userType,
      projects,
      currentProjectId,
    } = body;

    if (
      !Array.isArray(preQuizAnswers) ||
      !Array.isArray(mainQuizAnswers) ||
      typeof isRegistered !== "boolean" ||
      typeof userType !== "string" ||
      !Array.isArray(projects)
    ) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    const quizDoc = new QuizModel({
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
  } catch (error) {
    console.error("Error saving quiz:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const quizzes = await QuizModel.find({});
    return NextResponse.json(quizzes);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
