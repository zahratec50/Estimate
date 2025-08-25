"use client";

import { useCallback, useState, useMemo } from "react";
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

export default function QuizNavigation({
  isHelpOpen,
  isFirstQuiz,
}: QuestionProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Selectors جدا برای حداقل ری‌رندر
  const currentStepFirstQuiz = useAppStore((s) => s.currentStepFirstQuiz);
  const currentStepMainQuiz = useAppStore((s) => s.currentStepMainQuiz);
  const isContinueAllowed = useAppStore((s) => s.isContinueAllowed);
  const preQuizAnswers = useAppStore((s) => s.preQuizAnswers);
  const mainQuizAnswersTemp = useAppStore((s) => s.mainQuizAnswersTemp);
  const projects = useAppStore((s) => s.projects);
  const currentProjectId = useAppStore((s) => s.currentProjectId);
  const isRegistered = useAppStore((s) => s.isRegistered);
  const userType = useAppStore((s) => s.userType);

  const setCurrentStepFirstQuiz = useAppStore((s) => s.setCurrentStepFirstQuiz);
  const setCurrentStepMainQuiz = useAppStore((s) => s.setCurrentStepMainQuiz);
  const clearQuizData = useAppStore((s) => s.clearQuizData);
  const setRegistered = useAppStore((s) => s.setRegistered);

  const quiz = isFirstQuiz ? firstQuestion : mainQuizData;
  const currentStep = isFirstQuiz ? currentStepFirstQuiz : currentStepMainQuiz;
  const totalSteps = quiz.length;

  const project = useMemo(
    () => projects.find((p) => p.id === currentProjectId),
    [projects, currentProjectId]
  );

  const currentQuestion = useMemo(
    () => quiz[currentStep - 1],
    [quiz, currentStep]
  );

  // format answers once
  const formatAnswersForServer = useCallback(
    (answers: { question?: string; answer: string | string[] }[]) =>
      (answers || []).map((a) => ({
        question: a.question || "",
        answer: Array.isArray(a.answer) ? a.answer.join(",") : a.answer,
      })),
    []
  );

  const payload = useMemo(() => {
    if (!currentQuestion) return null;

    const basePayload: any = {
      questions: quiz.map((q) => ({
        id: q.id,
        title: q.title,
        type: q.type,
        options: q.options || [],
        multiple: Boolean(q.multiple),
        validation: q.validation || { required: false, errorMessage: "" },
        fields: q.fields || [],
      })),
      isRegistered,
      userType,
    };

    if (isFirstQuiz) {
      basePayload.preQuizAnswers = formatAnswersForServer(preQuizAnswers);
    } else {
      basePayload.mainQuizAnswers = project
        ? formatAnswersForServer(project.mainQuizAnswers)
        : formatAnswersForServer(mainQuizAnswersTemp);
      basePayload.currentProjectId = currentProjectId;
    }

    return basePayload;
  }, [
    quiz,
    preQuizAnswers,
    mainQuizAnswersTemp,
    isFirstQuiz,
    project,
    currentProjectId,
    isRegistered,
    userType,
    formatAnswersForServer,
    currentQuestion,
  ]);

  const handleNext = useCallback(async () => {
    if (!currentQuestion || !isContinueAllowed(currentQuestion, isFirstQuiz)) return;

    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      if (isFirstQuiz) setCurrentStepFirstQuiz(nextStep);
      else setCurrentStepMainQuiz(nextStep);

      router.push(isFirstQuiz ? `/firstQuiz/${nextStep}` : `/mainQuiz/${nextStep}`);
      return;
    }

    if (!isFirstQuiz && (!currentProjectId || !project)) {
      alert(
        projects.length === 0
          ? "شما هنوز هیچ پروژه‌ای ندارید. لطفا ابتدا پروژه بسازید."
          : "پروژه انتخاب نشده یا وجود ندارد! لطفا یک پروژه انتخاب کنید."
      );
      return;
    }

    if (!payload) return;

    setLoading(true);
    try {
      const apiPath = isFirstQuiz ? "/api/saveFirstQuiz" : "/api/saveMainQuiz";
      setShowModal(true)
      // const res = await axios.post(apiPath, payload);

      // if (res.data.success) {
      //   setShowModal(true);
      //   clearQuizData();
      // } else {
      //   alert("خطا در داده‌ها: " + res.data.message);
      // }
    } catch (err) {
      console.error("خطا در ارسال به API:", err);
      alert("خطا در ارسال داده‌ها، لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }, [
    currentStep,
    totalSteps,
    isFirstQuiz,
    currentQuestion,
    isContinueAllowed,
    setCurrentStepFirstQuiz,
    setCurrentStepMainQuiz,
    router,
    payload,
    currentProjectId,
    project,
    projects,
    clearQuizData,
  ]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      if (isFirstQuiz) setCurrentStepFirstQuiz(prevStep);
      else setCurrentStepMainQuiz(prevStep);

      router.push(isFirstQuiz ? `/firstQuiz/${prevStep}` : `/mainQuiz/${prevStep}`);
    }
  }, [currentStep, isFirstQuiz, setCurrentStepFirstQuiz, setCurrentStepMainQuiz, router]);

  const handleRegister = useCallback(() => {
    setRegistered(true);
    router.push("/subscription");
    setShowModal(false);
  }, [setRegistered, router]);

  return (
    <>
      <div className={`w-full ${isHelpOpen ? "max-w-[800px]" : "max-w-full"} font-roboto px-4 sm:px-0`}>
        <hr className="border-t border-gray-300 dark:border-secondary-700 my-4" />
        <div className={clsx(
          "flex items-center gap-4",
          currentStep > 1 ? "justify-between" : "justify-end"
        )}>
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
                "rounded-lg font-medium text-white transition flex items-center justify-center gap-2 w-full max-w-[169px] h-12 text-base sm:text-lg px-3",
                !currentQuestion || !isContinueAllowed(currentQuestion, isFirstQuiz) || loading
                  ? "bg-gray-300 dark:bg-secondary-700 text-gray-500 cursor-not-allowed"
                  : "bg-primary-500 dark:bg-secondary-500 hover:bg-primary-200 dark:hover:bg-secondary-400"
              )}
              aria-label="Continue to next question"
            >
              {loading ? "sending..." : currentStep === totalSteps ? "Finish" : "Continue"}
              {!loading && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6" fill="none">
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
