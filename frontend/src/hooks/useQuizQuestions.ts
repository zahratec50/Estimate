// import { useQuery, UseQueryOptions } from "@tanstack/react-query";
// import rawQuestions from "@/data/mainQuizData.json";
// import { QuestionItem } from "@/store/useAppStore"; // مسیر QuestionItem خودت

// export const useQuizQuestions = () => {
//   return useQuery<QuestionItem[], Error>({
//     queryKey: ["quiz-questions"],
//     queryFn: async () => {
//       try {
//         const res = await fetch("/api/quiz");
//         if (!res.ok) throw new Error("API fail");
//         const data = await res.json();

//         // تبدیل id ها به number و type-safe کردن داده
//         return (data as any[]).map((q) => ({
//           ...q,
//           id: typeof q.id === "string" ? parseInt(q.id) : q.id,
//         }));
//       } catch {
//         // fallback به فایل لوکال و تبدیل type
//         return (rawQuestions as unknown as QuestionItem[]).map((q) => ({
//           ...q,
//           id: typeof q.id === "string" ? parseInt(q.id) : q.id,
//         }));
//       }
//     },
//     staleTime: 1000 * 60, // یک دقیقه stale
//     retry: 1, // در صورت خطا یک بار retry
//   } as UseQueryOptions<QuestionItem[], Error>);
// };

import { useQuery } from "@tanstack/react-query";
import rawQuestions from "@/data/mainQuizData.json";
import { QuestionItem } from "@/store/useAppStore";

export const useQuizQuestions = () => {
  return useQuery<QuestionItem[], Error>({
    queryKey: ["quiz-questions"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/quiz");
        if (!res.ok) throw new Error("API fail");
        const data = await res.json();

        // تبدیل id به string برای هماهنگی با QuestionItem
        return (data as any[]).map((q) => ({
          ...q,
          id: String(q.id),
        }));
      } catch (err) {
        console.warn("API fail, using local fallback", err);
        // fallback به داده لوکال
        return (rawQuestions as unknown as QuestionItem[]).map((q) => ({
          ...q,
          id: String(q.id),
        }));
      }
    },
    staleTime: 1000 * 60, // یک دقیقه stale
    retry: 1, // یک بار تلاش مجدد در صورت خطا
  });
};
