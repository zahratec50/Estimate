"use client";

import { useCallback, useState, useMemo } from "react";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useAppStore, StoredAnswer, QuestionItem } from "@/store/useAppStore";
import CompletionModal from "./CompletionModal/CompletionModal";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";

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

  // Selectors from store
  const {
    currentStepFirstQuiz,
    currentStepMainQuiz,
    completedQuizzes,
    isContinueAllowed,
    preQuizAnswers,
    mainQuizAnswersTemp,
    projects,
    currentProjectId,
    firstQuizQuestions,
    mainQuizQuestions,
    isRegistered,
    userType,
    setCurrentStepFirstQuiz,
    setCurrentStepMainQuiz,
    setCompletedQuizzes,
    clearQuizData,
    setRegistered,
  } = useAppStore();

  // Select data
  const quiz: QuestionItem[] = isFirstQuiz
    ? firstQuizQuestions
    : mainQuizQuestions;
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

  const canContinueCurrent = useMemo(
    () => currentQuestion && isContinueAllowed(currentQuestion, isFirstQuiz),
    [
      currentQuestion,
      isContinueAllowed,
      isFirstQuiz,
      preQuizAnswers,
      mainQuizAnswersTemp,
      project,
    ]
  );

  const formatAnswersForServer = (answers: StoredAnswer[]) => {
    return answers.map((a) => ({
      question: a.question,
      answer: Array.isArray(a.answer)
        ? a.answer
        : typeof a.answer === "object"
        ? Object.values(a.answer)
        : [a.answer],
    }));
  };

  // Final payload
  const payload = useMemo(() => {
    if (!currentQuestion) return null;

    const basePayload: any = {
      questions: quiz.map((q) => ({
        id: q.id,
        title: q.title,
        type: q.type,
        // اگر q.options یک آرایه از آبجکت است، فقط label را بگیریم
        options:
          q.options?.map((o: any) => (typeof o === "string" ? o : o.label)) ||
          [],
        multiple: Boolean(q.multiple),
        validation: q.validation || { required: false, errorMessage: "" },
        fields: q.fields || [],
        imageUrl: q.imageUrl,
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
      basePayload.projects = projects;
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
    projects,
    formatAnswersForServer,
    currentQuestion,
  ]);

  // Handle next step
  const handleNext = useCallback(async () => {
    if (!currentQuestion || !canContinueCurrent) {
      showErrorToast({
        title: "Invalid input",
        description:
          currentQuestion?.validation?.errorMessage ||
          "Please provide a valid answer.",
      });
      return;
    }

    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      if (isFirstQuiz) setCurrentStepFirstQuiz(nextStep);
      else setCurrentStepMainQuiz(nextStep);

      router.push(
        isFirstQuiz ? `/firstQuiz/${nextStep}` : `/mainQuiz/${nextStep}`
      );
      return;
    }

    // At the end of quiz
    if (!isFirstQuiz && (!currentProjectId || !project)) {
      showErrorToast({
        title: "Error",
        description:
          projects.length === 0
            ? "You haven't created any projects yet. Please create a project first."
            : "No project selected or it doesn't exist! Please select a project.",
      });
      return;
    }

    setLoading(true);
    try {
      const apiPath = isFirstQuiz ? "/api/saveFirstQuiz" : "/api/saveMainQuiz";
      console.log("Sending payload to API:", payload); // Debug log
      const response = await axios.post(apiPath, payload);

      if (isFirstQuiz) {
        setShowModal(true);
        setCurrentStepFirstQuiz(1); // Reset step only, keep preQuizAnswers
      } else {
        // setShowModal(true);
        setTimeout(() => router.push("/dashboard"), 1500);
        setCompletedQuizzes((prev) => prev + 1);
        // clearQuizData(); // Clear data for mainQuiz
      }
    } catch (err: any) {
      console.error("Error sending to API:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      showErrorToast({
        title: "Error",
        description: `Failed to send data: ${
          err.response?.data?.error || err.message
        }. Please try again.`,
      });
    } finally {
      setLoading(false);
    }
  }, [
    currentQuestion,
    canContinueCurrent,
    currentStep,
    totalSteps,
    isFirstQuiz,
    setCurrentStepFirstQuiz,
    setCurrentStepMainQuiz,
    router,
    payload,
    currentProjectId,
    project,
    projects,
    clearQuizData,
  ]);

  // Handle back
  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      if (isFirstQuiz) setCurrentStepFirstQuiz(prevStep);
      else setCurrentStepMainQuiz(prevStep);

      router.push(
        isFirstQuiz ? `/firstQuiz/${prevStep}` : `/mainQuiz/${prevStep}`
      );
    }
  }, [
    currentStep,
    isFirstQuiz,
    setCurrentStepFirstQuiz,
    setCurrentStepMainQuiz,
    router,
  ]);

  // Handle registration after completion
  const handleRegister = useCallback(() => {
    setRegistered(true);
    router.push("/subscription");
    setShowModal(false);
  }, [setRegistered, router]);

  return (
    <>
      <div
        className={`w-full ${
          isHelpOpen ? "max-w-[800px]" : "max-w-full"
        } font-roboto px-4 sm:px-0`}
      >
        <hr className="border-t border-gray-300 dark:border-secondary-700 my-4" />

        <div
          className={clsx(
            "flex items-center gap-4",
            currentStep > 1 ? "justify-between" : "justify-end"
          )}
        >
          {/* Back button */}
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
                className="w-6 h-6 text-blackNew-50"
                fill="none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </button>
          )}

          {/* Continue / Finish button */}
          <div className="relative">
            <button
              onClick={handleNext}
              disabled={!canContinueCurrent || loading}
              className={clsx(
                "rounded-lg font-medium text-white transition flex items-center justify-center gap-2 w-full max-w-[169px] h-12 text-base sm:text-lg px-3",
                !canContinueCurrent || loading
                  ? "bg-gray-300 dark:bg-secondary-700 text-gray-500 cursor-not-allowed"
                  : "bg-primary-500 dark:bg-secondary-500 hover:bg-primary-200 dark:hover:bg-secondary-400"
              )}
            >
              {loading
                ? "Sending..."
                : currentStep === totalSteps
                ? "Finish"
                : "Continue"}
              {!loading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Completion modal */}
      {showModal && <CompletionModal handleRegister={handleRegister} />}
    </>
  );
}
