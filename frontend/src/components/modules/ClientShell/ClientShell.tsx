"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import QuizPage from "@/components/templates/QuizPage/QuizPage";
import QuizNavigation from "@/components/templates/QuizNavigation/QuizNavigation";
import ProgressSegment from "../ProgressBar/ProgressBar";
import { useAppStore } from "@/store/useAppStore";
import clsx from "clsx";
import HelpPanel from "../HelpPanel/HelpPanel";
import firstQuestion from "@/data/firstQuestion.json";

export default function ClientShell() {
  const {
    isRegistered,
    userType,
    preQuizAnswers,
    setUserType,
    syncWithServer,
    isSidebarOpen,
    isHelpOpen,
    toggleSidebar,
    toggleHelp,
    currentStep,
  } = useAppStore();

  const router = useRouter();

  useEffect(() => {
    if (!isRegistered && preQuizAnswers.length === firstQuestion.length) {
      // فرض می‌کنیم سوال سوم ایندکس 2 است
      const questionObj = firstQuestion[2]; // سوال سوم
      if (!questionObj) return;

      // پیدا کردن جواب سوال سوم از preQuizAnswers بر اساس متن سوال
      const budgetAnswerObj = preQuizAnswers.find(
        (answer) => answer.question === questionObj.question
      );

      const budgetAnswer = budgetAnswerObj?.answer ?? "";

      let determinedUserType: "designer" | "contractor" | "homeowner" = "homeowner";

      // منطق تشخیص userType بر اساس جواب سوال سوم
      if (budgetAnswer.toLowerCase().includes("designer") || budgetAnswer.toLowerCase().includes("6")) {
        determinedUserType = "designer";
      } else if (budgetAnswer.toLowerCase().includes("contractor") || budgetAnswer.toLowerCase() === "1") {
        determinedUserType = "contractor";
      } else {
        determinedUserType = "homeowner";
      }

      setUserType(determinedUserType);
    }
  }, [preQuizAnswers, isRegistered, setUserType]);

  useEffect(() => {
    if (isRegistered) {
      syncWithServer();
    }
  }, [isRegistered, syncWithServer]);

  return (
    <div className="flex min-h-screen dark:bg-secondary-900 bg-gray-50 relative">
      <Sidebar isOpen={isSidebarOpen} isHelpOpen={isHelpOpen} onClose={toggleSidebar} />

      <div
        className={clsx(
          "flex flex-col flex-1 transition-all duration-300",
          isHelpOpen ? "lg:mr-[320px]" : "md:ml-64"
        )}
      >
        <Topbar
          isHelpOpen={isHelpOpen}
          onHelpToggle={toggleHelp}
          onMenuClick={toggleSidebar}
        />
        <main
          className={clsx(
            "flex-grow py-5 sm:py-10",
            isHelpOpen
              ? "w-[70%] px-0 md:px-5 lg:pl-10 xl:px-10 sm:ml-72"
              : "w-full md:px-10 lg:px-20 xl:px-40"
          )}
        >
          <ProgressSegment isHelpOpen={isHelpOpen} />
          <QuizPage isHelpOpen={isHelpOpen} />
          <QuizNavigation isHelpOpen={isHelpOpen} />
        </main>
      </div>

      {isHelpOpen && (
        <div className="fixed top-0 right-0 h-full w-[320px] bg-white dark:bg-secondary-800 shadow-lg z-50 p-4">
          <button
            onClick={toggleHelp}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-300"
            aria-label="Close help panel"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <HelpPanel isHelpOpen={isHelpOpen} />
        </div>
      )}
    </div>
  );
}
