"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import HelpPanel from "../HelpPanel/HelpPanel";
import { useAppStore } from "@/store/useAppStore";
import firstQuestion from "@/data/firstQuestion.json";
import mainQuizData from "@/data/mainQuizData.json";
import { usePathname } from "next/navigation";

// Helper: Detect userType based on the answer
const detectUserType = (
  answer: string
): "designer" | "contractor" | "homeowner" => {
  const lower = answer.toLowerCase();
  if (lower.includes("designer") || lower.includes("6")) return "designer";
  if (lower.includes("contractor") || lower === "1") return "contractor";
  return "homeowner";
};

export default function UserDashboard({ children, isFirstQuiz }: { children: React.ReactNode; isFirstQuiz: boolean }) {
  const {
    isRegistered,
    setRegistered,
    preQuizAnswers,
    setUserType,
    isSidebarOpen,
    isHelpOpen,
    toggleSidebar,
    toggleHelp,
    currentStepFirstQuiz,
    currentStepMainQuiz,
    setCurrentStepFirstQuiz,
    setCurrentStepMainQuiz,
    syncFirstQuizWithServer,
    syncMainQuizWithServer,
  } = useAppStore();

  const router = useRouter();
  const pathname = usePathname();
  const stepFromPath = parseInt(pathname.split("/").pop() || "1", 10);

  // Update step from URL
  useEffect(() => {
    if (isFirstQuiz) setCurrentStepFirstQuiz(stepFromPath);
    else setCurrentStepMainQuiz(stepFromPath);
  }, [stepFromPath, isFirstQuiz]);

  // Determine userType based on preQuizAnswers
  useEffect(() => {
    if (!isRegistered && preQuizAnswers.length === firstQuestion.length) {
      const budgetQuestion = firstQuestion[2];
      const budgetAnswer = preQuizAnswers.find(
        (a) => a.question === budgetQuestion?.title
      )?.answer;

      let answerString = "";
      if (typeof budgetAnswer === "string") answerString = budgetAnswer;
      else if (Array.isArray(budgetAnswer)) answerString = budgetAnswer[0] || "";
      else if (budgetAnswer && typeof budgetAnswer === "object") {
        const firstValue = Object.values(budgetAnswer)[0];
        if (typeof firstValue === "string") answerString = firstValue;
      }

      if (answerString) {
        setUserType(detectUserType(answerString));
      }
    }
  }, [isRegistered, preQuizAnswers, setUserType]);

  // Sync with server if already registered
  // ! test you have to change it
  useEffect(() => {
    if (!isRegistered) return;
  
    const isLastQuestion = isFirstQuiz
      ? currentStepFirstQuiz === firstQuestion.length
      : currentStepMainQuiz === mainQuizData.length;

    if (isLastQuestion) {
      if (isFirstQuiz) {
        syncFirstQuizWithServer();
      } else {
        syncMainQuizWithServer();
      }
    }
  }, [isRegistered, isFirstQuiz, currentStepFirstQuiz, currentStepMainQuiz]);

  const currentQuestion = isFirstQuiz
    ? firstQuestion[currentStepFirstQuiz - 1]
    : mainQuizData[currentStepMainQuiz - 1];

  return (
    <div className="flex min-h-screen relative dark:bg-secondary-900 bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        isHelpOpen={isHelpOpen}
        onClose={toggleSidebar}
        
      />

      {/* Main Layout */}
      <div
        className={clsx(
          "flex flex-col flex-1 transition-all duration-300",
          isHelpOpen ? "lg:mr-[305px]" : "md:ml-64"
        )}
      >
        {/* Topbar */}
        <Topbar
          onHelpToggle={toggleHelp}
          isHelpOpen={isHelpOpen}
          onMenuClick={toggleSidebar}
        />

        {/* Page Content */}
        <main
          className={clsx(
            "flex-grow py-5 sm:py-6",
            isHelpOpen
              ? "w-[70%] px-0 md:px-5 lg:pl-10 xl:px-10 sm:ml-72"
              : "w-full md:px-0 lg:px-20 xl:px-32"
          )}
        >
          {/* <ProgressSegment isHelpOpen={isHelpOpen} isFirstQuiz={isFirstQuiz} /> */}
          {children}
        </main>
      </div>

      {/* Help Panel */}
      {isHelpOpen && (
        <aside className="fixed top-0 right-0 h-full w-[320px] z-50 bg-white dark:bg-secondary-800 shadow-lg p-4">
          <button
            onClick={toggleHelp}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-300"
            aria-label="Close help panel"
          >
            <svg
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
        </aside>
      )}
    </div>
  );
}
