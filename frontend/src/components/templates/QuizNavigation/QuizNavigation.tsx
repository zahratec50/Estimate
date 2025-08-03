"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback, useState } from "react";
import clsx from "clsx";
import { useAppStore } from "@/store/useAppStore";
import firstQuestion from "@/data/firstQuestion.json";
import CompletionModal from "./CompletionModal/CompletionModal";

export default function QuizNavigation({
  isHelpOpen,
}: {
  isHelpOpen: boolean;
}) {
  const {
    currentStep,
    setCurrentStep,
    isRegistered,
    userType,
    getCurrentAnswer,
    isContinueAllowed,
  } = useAppStore();

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const totalSteps = isRegistered && userType ? 1 : firstQuestion.length;

  const handleNext = useCallback(() => {
    if (!isContinueAllowed(firstQuestion)) return;

    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      router.push(`/firstQuiz/${nextStep}`);
    } else {
      setShowModal(true);
    }
  }, [currentStep, totalSteps, setCurrentStep, router, isContinueAllowed]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      router.push(`/firstQuiz/${prevStep}`);
    }
  }, [currentStep, setCurrentStep, router]);

  const handleRegister = () => {
    useAppStore.getState().setRegistered(true);
    router.push("/dashboard");
    setShowModal(false);
  };

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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </button>
          )}

          <div className="relative">
            <button
              onClick={handleNext}
              disabled={!isContinueAllowed(firstQuestion)}
              className={clsx(
                "rounded-lg font-medium text-white",
                isContinueAllowed(firstQuestion)
                  ? "bg-primary-500 dark:bg-secondary-500 hover:bg-primary-600 dark:hover:bg-secondary-400"
                  : "bg-gray-300 dark:bg-secondary-700 text-gray-500 cursor-not-allowed",
                "transition flex items-center justify-center gap-2 w-full max-w-[169px] h-12 text-base sm:text-lg px-3"
              )}
              aria-label="Continue to next question"
            >
              Continue
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
            </button>
          </div>
        </div>
      </div>

      {showModal && <CompletionModal handleRegister={handleRegister} />}
    </>
  );
}
