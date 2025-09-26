"use client";

import React, { useEffect, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import dynamic from "next/dynamic";

import Topbar from "../../../modules/Topbar/Topbar";
import TopbarActions from "@/components/modules/Topbar/TopbarActions";
import HelpPanel from "../../../modules/HelpPanel/HelpPanel";
import { ClientOnly } from "@/components/templates/ClientOnly/ClientOnly";
import { useAppStore } from "@/store/useAppStore";

import firstQuestion from "@/data/firstQuestion.json";
import mainQuizData from "@/data/mainQuizData.json";

const Sidebar = dynamic(() => import("../../../modules/Sidebar/Sidebar"), { ssr: false });

const detectUserType = (answer: string): "designer" | "contractor" | "homeowner" => {
  const lower = answer.toLowerCase();
  if (lower.includes("designer") || lower.includes("6")) return "designer";
  if (lower.includes("contractor") || lower === "1") return "contractor";
  return "homeowner";
};

type ClientShellProps = {
  isFirstQuiz: boolean;
  isTopbarMainQuiz: boolean;
  children: React.ReactNode;
  firstQuiz?: boolean;
};

const ClientShellBase = ({ isFirstQuiz, isTopbarMainQuiz, children, firstQuiz }: ClientShellProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // Zustand store
  const isSidebarOpen = useAppStore(state => state.isSidebarOpen);
  const isHelpOpen = useAppStore(state => state.isHelpOpen);
  const toggleSidebar = useAppStore(state => state.toggleSidebar);
  const toggleHelp = useAppStore(state => state.toggleHelp);
  const isRegistered = useAppStore(state => state.isRegistered);
  const preQuizAnswers = useAppStore(state => state.preQuizAnswers);
  const setUserType = useAppStore(state => state.setUserType);
  const setCurrentStepFirstQuiz = useAppStore(state => state.setCurrentStepFirstQuiz);
  const setCurrentStepMainQuiz = useAppStore(state => state.setCurrentStepMainQuiz);
  const syncFirstQuizWithServer = useAppStore(state => state.syncFirstQuizWithServer);
  const syncMainQuizWithServer = useAppStore(state => state.syncMainQuizWithServer);
  const currentStepFirstQuiz = useAppStore(state => state.currentStepFirstQuiz);
  const currentStepMainQuiz = useAppStore(state => state.currentStepMainQuiz);

  const stepFromPath = useMemo(() => parseInt(pathname.split("/").pop() || "1", 10), [pathname]);

  useEffect(() => {
    if (isFirstQuiz) setCurrentStepFirstQuiz(stepFromPath);
    else setCurrentStepMainQuiz(stepFromPath);
  }, [stepFromPath]);

  useEffect(() => {
    if (!isRegistered && preQuizAnswers.length === firstQuestion.length) {
      const budgetQuestion = firstQuestion[2];
      const budgetAnswer = preQuizAnswers.find(a => a.question === budgetQuestion?.title)?.answer;
      let answerString = "";
      if (typeof budgetAnswer === "string") answerString = budgetAnswer;
      else if (Array.isArray(budgetAnswer)) answerString = budgetAnswer[0] || "";
      else if (budgetAnswer && typeof budgetAnswer === "object") {
        const firstValue = Object.values(budgetAnswer)[0];
        if (typeof firstValue === "string") answerString = firstValue;
      }
      if (answerString) setUserType(detectUserType(answerString));
    }
  }, [isRegistered, preQuizAnswers]);

  useEffect(() => {
    if (!isRegistered) return;
    const isLastQuestion = isFirstQuiz
      ? currentStepFirstQuiz === firstQuestion.length
      : currentStepMainQuiz === mainQuizData.length;
    if (isLastQuestion) {
      if (isFirstQuiz) syncFirstQuizWithServer();
      else syncMainQuizWithServer();
    }
  }, [isRegistered, currentStepFirstQuiz, currentStepMainQuiz]);

  const handleHelpToggle = useCallback(() => toggleHelp(), [toggleHelp]);
  const handleMenuClick = useCallback(() => toggleSidebar(), [toggleSidebar]);

  const currentQuestion = useMemo(() => {
    return isFirstQuiz
      ? firstQuestion[currentStepFirstQuiz - 1]
      : mainQuizData[currentStepMainQuiz - 1];
  }, [isFirstQuiz, currentStepFirstQuiz, currentStepMainQuiz]);

  return (
    <div className="flex min-h-screen relative dark:bg-secondary-900 bg-gray-50">
      <ClientOnly>
        <Sidebar isOpen={isSidebarOpen} isHelpOpen={isHelpOpen} onClose={handleMenuClick} />
      </ClientOnly>

      <div className={clsx("flex flex-col flex-1 transition-all duration-300", isHelpOpen ? "lg:mr-[305px]" : "lg:ml-64")}>
        <Topbar onHelpToggle={handleHelpToggle} isHelpOpen={isHelpOpen} isFirstQuiz={isFirstQuiz} onMenuClick={handleMenuClick} />
        {!isFirstQuiz && isTopbarMainQuiz && <TopbarActions isFirstQuiz={isFirstQuiz} isHelpOpen={isHelpOpen} />}
        <main
          className={clsx(
            "flex-grow py-5 sm:py-6",
            isHelpOpen
              ? "w-[70%] px-0 md:px-5 lg:pl-10 xl:px-10 sm:ml-72"
              : isTopbarMainQuiz
              ? "w-full px-3 md:px-5 lg:px-20 xl:px-32"
              : firstQuiz
              ? "w-full px-3 md:px-5 lg:px-20 xl:px-32"
              : "w-full lg:px-5 xl:px-30"
          )}
        >
          {children}
        </main>
      </div>

      {isHelpOpen && (
        <aside className="fixed top-0 right-0 h-full w-[320px] z-50 bg-white dark:bg-secondary-800 shadow-lg p-4">
          <button
            onClick={handleHelpToggle}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-300"
            aria-label="Close help panel"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <HelpPanel isHelpOpen={isHelpOpen} />
        </aside>
      )}
    </div>
  );
};

export default React.memo(ClientShellBase);
