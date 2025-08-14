// "use client";

// import { useCallback, useState } from "react";
// import axios from "axios";
// import clsx from "clsx";
// import { useRouter } from "next/navigation";
// import { useAppStore } from "@/store/useAppStore";
// import firstQuestion from "@/data/firstQuestion.json";
// import mainQuizData from "@/data/mainQuizData.json"
// import CompletionModal from "./CompletionModal/CompletionModal";

// type QuestionProps = {
//   isHelpOpen: boolean;
//   isFirstQuiz: boolean;
// };

// export default function QuizNavigation({ isHelpOpen, isFirstQuiz }: QuestionProps) {
//   const {
//     currentStep,
//     setCurrentStep,
//     isContinueAllowed,
//     preQuizAnswers,
//     mainQuizAnswers,
//     isRegistered,
//     userType,
//     projects,
//     currentProjectId,
//     clearQuizData,
//   } = useAppStore();

//   const router = useRouter();
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const quiz = isFirstQuiz ? firstQuestion : mainQuizData;

//   const totalSteps = isRegistered && userType ? 1 : quiz.length;

//   // ✅ فرمت کردن جواب‌ها قبل از ارسال به API
//   const formatAnswersForServer = (
//     answers: { question?: string; answer: string | string[] }[]
//   ) => {
//     return (answers || []).map((a) => ({
//       question: a.question || "",
//       answer: Array.isArray(a.answer) ? a.answer.join(",") : a.answer,
//     }));
//   };

//   // ✅ ادامه یا ارسال به API
//   const handleNext = useCallback(async () => {
//     // اگر سوال فعلی جواب داده نشده → برگرد
//     if (!isContinueAllowed(quiz[currentStep - 1])) return;

//     // اگر هنوز به آخرین مرحله نرسیدیم → برو مرحله بعد
//     if (currentStep < totalSteps) {
//       const nextStep = currentStep + 1;
//       setCurrentStep(nextStep);
//       router.push(`/firstQuiz/${nextStep}`);
//       return;
//     }

//     // اگر آخرین مرحله هست → ارسال به API
//     setLoading(true);
//     try {
//       const formattedPreQuizAnswers = formatAnswersForServer(preQuizAnswers);
//       const formattedMainQuizAnswers = formatAnswersForServer(mainQuizAnswers);

//       const formattedProjects = (projects || []).map((project) => ({
//         ...project,
//         mainQuizAnswers: formatAnswersForServer(project.mainQuizAnswers || []),
//       }));

//       const formattedQuestions = (quiz || []).map((q) => ({
//         id: q.id,
//         title: q.title,
//         type: q.type,
//         options: q.options || [],
//         multiple: Boolean(q.multiple),
//         validation: q.validation || { required: false, errorMessage: "" },
//         fields: q.fields || [],
//       }));

//       const res = await axios.post("/api/saveFirstQuiz", {
//         questions: formattedQuestions,
//         preQuizAnswers: formattedPreQuizAnswers,
//         mainQuizAnswers: formattedMainQuizAnswers,
//         isRegistered,
//         userType,
//         projects: formattedProjects,
//         currentProjectId,
//       });

//       if (res.data.success) {
//         setShowModal(true);
//         clearQuizData();
//       } else {
//         alert("Error in data: " + res.data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("خطا در ارسال داده‌ها، جزئیات در کنسول.");
//     } finally {
//       setLoading(false);
//     }
//   }, [
//     currentStep,
//     totalSteps,
//     quiz,
//     preQuizAnswers,
//     mainQuizAnswers,
//     isRegistered,
//     userType,
//     projects,
//     currentProjectId,
//     clearQuizData,
//     router,
//     isContinueAllowed,
//   ]);

//   // ✅ دکمه برگشت
//   const handleBack = useCallback(() => {
//     if (currentStep > 1) {
//       const prevStep = currentStep - 1;
//       setCurrentStep(prevStep);
//       router.push(`/firstQuiz/${prevStep}`);
//     }
//   }, [currentStep, setCurrentStep, router]);

//   // ✅ ثبت نهایی و رفتن به داشبورد
//   const handleRegister = () => {
//     useAppStore.getState().setRegistered(true);
//     router.push("/dashboard");
//     setShowModal(false);
//   };

//   const currentQuestion = quiz[currentStep - 1];


//   return (
//     <>
//       <div className={`w-full ${isHelpOpen ? "max-w-[800px]" : "max-w-full"} font-roboto px-4 sm:px-0`}>
//         <hr className="border-t border-gray-300 dark:border-secondary-700 my-4" />

//         <div
//           className={clsx(
//             "flex items-center gap-4",
//             currentStep > 1 ? "justify-between" : "justify-end"
//           )}
//         >
//           {currentStep > 1 && (
//             <button
//               onClick={handleBack}
//               aria-label="Go back"
//               className="w-12 h-12 flex items-center justify-center border border-secondary-500 rounded-md hover:bg-gray-200 dark:hover:bg-secondary-200 dark:bg-secondary-50 transition"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="w-6 h-6 text-black-50"
//                 fill="none"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
//               </svg>
//             </button>
//           )}

//           <div className="relative">
//             <button
//               onClick={handleNext}
//               disabled={!currentQuestion || !isContinueAllowed(currentQuestion) || loading}
//               className={clsx(
//                 "rounded-lg font-medium text-white",
//                 !currentQuestion || !isContinueAllowed(currentQuestion) || loading
//                   ? "bg-gray-300 dark:bg-secondary-700 text-gray-500 cursor-not-allowed"
//                   : "bg-primary-500 dark:bg-secondary-500 hover:bg-primary-200 dark:hover:bg-secondary-400",
//                 "transition flex items-center justify-center gap-2 w-full max-w-[169px] h-12 text-base sm:text-lg px-3"
//               )}
//               aria-label="Continue to next question"
//             >
//               {loading ? "در حال ارسال..." : currentStep === totalSteps ? "Finish" : "Continue"}
//               {!loading && (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="w-5 h-5 sm:w-6 sm:h-6"
//                   fill="none"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {showModal && <CompletionModal handleRegister={handleRegister} />}
//     </>
//   );
// }


"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import firstQuestion from "@/data/firstQuestion.json";
import mainQuizData from "@/data/mainQuizData.json";
import CompletionModal from "./CompletionModal/CompletionModal";

type QuestionProps = {
  isHelpOpen: boolean;
  isFirstQuiz: boolean;
};

export default function QuizNavigation({ isHelpOpen, isFirstQuiz }: QuestionProps) {
  const {
    currentStepFirstQuiz,
    currentStepMainQuiz,
    setCurrentStepFirstQuiz,
    setCurrentStepMainQuiz,
    isContinueAllowed,
    preQuizAnswers,
    mainQuizAnswers,
    isRegistered,
    userType,
    projects,
    currentProjectId,
    clearQuizData,
  } = useAppStore();

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const quiz = isFirstQuiz ? firstQuestion : mainQuizData;
  const currentStep = isFirstQuiz ? currentStepFirstQuiz : currentStepMainQuiz;
  const totalSteps = quiz.length;

  const formatAnswersForServer = (
    answers: { question?: string; answer: string | string[] }[]
  ) => {
    return (answers || []).map((a) => ({
      question: a.question || "",
      answer: Array.isArray(a.answer) ? a.answer.join(",") : a.answer,
    }));
  };

  const handleNext = useCallback(async () => {
    if (!isContinueAllowed(quiz[currentStep - 1], isFirstQuiz)) return;

    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      if (isFirstQuiz) setCurrentStepFirstQuiz(nextStep);
      else setCurrentStepMainQuiz(nextStep);

      // مسیر مناسب براساس quiz
      const path = isFirstQuiz ? `/firstQuiz/${nextStep}` : `/mainQuiz/${nextStep}`;
      router.push(path);
      return;
    }

    // آخرین مرحله → ارسال به API
    setLoading(true);
    try {
      const formattedPreQuizAnswers = formatAnswersForServer(preQuizAnswers);
      const formattedMainQuizAnswers = formatAnswersForServer(mainQuizAnswers);

      const formattedProjects = (projects || []).map((project) => ({
        ...project,
        mainQuizAnswers: formatAnswersForServer(project.mainQuizAnswers || []),
      }));

      const formattedQuestions = (quiz || []).map((q) => ({
        id: q.id,
        title: q.title,
        type: q.type,
        options: q.options || [],
        multiple: Boolean(q.multiple),
        validation: q.validation || { required: false, errorMessage: "" },
        fields: q.fields || [],
      }));

      const apiPath = isFirstQuiz ? "/api/saveFirstQuiz" : "/api/saveMainQuiz";

      const res = await axios.post(apiPath, {
        questions: formattedQuestions,
        preQuizAnswers: formattedPreQuizAnswers,
        mainQuizAnswers: formattedMainQuizAnswers,
        isRegistered,
        userType,
        projects: formattedProjects,
        currentProjectId,
      });

      if (res.data.success) {
        setShowModal(true);
        clearQuizData();
      } else {
        alert("Error in data: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("خطا در ارسال داده‌ها، جزئیات در کنسول.");
    } finally {
      setLoading(false);
    }
  }, [
    currentStep,
    totalSteps,
    quiz,
    preQuizAnswers,
    mainQuizAnswers,
    isRegistered,
    userType,
    projects,
    currentProjectId,
    clearQuizData,
    router,
    isContinueAllowed,
    isFirstQuiz,
    setCurrentStepFirstQuiz,
    setCurrentStepMainQuiz,
  ]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      if (isFirstQuiz) setCurrentStepFirstQuiz(prevStep);
      else setCurrentStepMainQuiz(prevStep);

      const path = isFirstQuiz ? `/firstQuiz/${prevStep}` : `/mainQuiz/${prevStep}`;
      router.push(path);
    }
  }, [currentStep, router, isFirstQuiz, setCurrentStepFirstQuiz, setCurrentStepMainQuiz]);

  const handleRegister = () => {
    useAppStore.getState().setRegistered(true);
    router.push("/dashboard");
    setShowModal(false);
  };

  const currentQuestion = quiz[currentStep - 1];

  return (
    <>
      <div className={`w-full ${isHelpOpen ? "max-w-[800px]" : "max-w-full"} font-roboto px-4 sm:px-0`}>
        <hr className="border-t border-gray-300 dark:border-secondary-700 my-4" />
        <div
          className={clsx(
            "flex items-center gap-4",
            currentStep > 1 ? "justify-between" : "justify-end"
          )}
        >
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              aria-label="Go back"
              className="w-12 h-12 flex items-center justify-center border border-secondary-500 rounded-md hover:bg-gray-200 dark:hover:bg-secondary-200 dark:bg-secondary-50 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-black-50"
                fill="none"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
          )}
          <div className="relative">
            <button
              onClick={handleNext}
              disabled={!currentQuestion || !isContinueAllowed(currentQuestion, isFirstQuiz) || loading}
              className={clsx(
                "rounded-lg font-medium text-white",
                !currentQuestion || !isContinueAllowed(currentQuestion, isFirstQuiz) || loading
                  ? "bg-gray-300 dark:bg-secondary-700 text-gray-500 cursor-not-allowed"
                  : "bg-primary-500 dark:bg-secondary-500 hover:bg-primary-200 dark:hover:bg-secondary-400",
                "transition flex items-center justify-center gap-2 w-full max-w-[169px] h-12 text-base sm:text-lg px-3"
              )}
              aria-label="Continue to next question"
            >
              {loading ? "در حال ارسال..." : currentStep === totalSteps ? "Finish" : "Continue"}
              {!loading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {showModal && <CompletionModal handleRegister={handleRegister} />}
    </>
  );
}
