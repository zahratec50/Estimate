
import Quiz from "@/components/templates/Quiz/Quiz"

export default function FirstQuizPage() {
  return <Quiz isFirstQuiz={true} />;
}



// import { redirect } from "next/navigation";
// import { connectDB } from "@/configs/db";
// import QuizModel from "@/models/Quiz1";
// import Quiz from "@/components/templates/Quiz/Quiz";
// import { verifyAccessToken } from "@/utils/auth";

// export default async function FirstQuizPageServer({ params }: { params: { numberQuiz: string } }) {
//   const accessToken = (await import("next/headers")).cookies().get("accessToken")?.value;
//   const user = accessToken ? verifyAccessToken(accessToken) : null;

//   if (user?.userId) {
//     await connectDB();
//     const quiz = await QuizModel.findOne({ userId: user.userId }).lean();
//     if (quiz) {
//       redirect(`/dashboard/profile/${quiz._id}`);
//     }
//   }

//   return <Quiz isFirstQuiz={true} step={parseInt(params.numberQuiz, 10)} />;
// }


// import { redirect } from "next/navigation";
// import { cookies } from "next/headers"; // مستقیم از next/headers استفاده می‌کنیم
// import { connectDB } from "@/configs/db";
// import QuizModel, { IQuiz } from "@/models/Quiz1"; // نوع IQuiz رو وارد می‌کنیم
// import Quiz from "@/components/templates/Quiz/Quiz";
// import { verifyAccessToken } from "@/utils/auth";

// export default async function FirstQuizPageServer({ params }: { params: { numberQuiz: string } }) {
//   const cookieStore =await cookies(); // دسترسی مستقیم به کوکی‌ها
//   const accessToken =  cookieStore.get("accessToken")?.value;
//   const user = accessToken ? verifyAccessToken(accessToken) : null;

//   if (user?.userId) {
//     await connectDB();
//     const quiz = await QuizModel.findOne({ userId: user.userId }).lean() as IQuiz | null;
//     if (quiz && quiz._id) {
//       redirect(`/dashboard/profile/${quiz._id}`);
//     }
//   }

//   return <Quiz isFirstQuiz={true} step={parseInt(params.numberQuiz, 10)} />;
// }