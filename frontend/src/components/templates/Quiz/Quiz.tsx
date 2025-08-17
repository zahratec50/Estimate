"use client";

import React from "react";
import { useAppStore } from "@/store/useAppStore";
import QuizPage from "./QuizPage/QuizPage";
import QuizNavigation from "./QuizNavigation/QuizNavigation";
import ProgressSegment from "./../../modules/ProgressBar/ProgressBar";

interface QuizProps {
  isFirstQuiz: boolean; // این باید به عنوان prop داده شود
}

export default function Quiz({ isFirstQuiz }: QuizProps) {
  const isHelpOpen = useAppStore((state) => state.isHelpOpen);
  const currentStepFirstQuiz = useAppStore((state) => state.currentStepFirstQuiz);
  const currentStepMainQuiz = useAppStore((state) => state.currentStepMainQuiz);

  // تشخیص سوال فعلی برای نمایش Navigation
  const currentQuestion = isFirstQuiz ? currentStepFirstQuiz : currentStepMainQuiz;

  return (
    <>
      {/* ProgressSegment فقط برای FirstQuiz */}
      {isFirstQuiz && (
        <ProgressSegment isHelpOpen={isHelpOpen} isFirstQuiz={isFirstQuiz} />
      )}

      {/* QuizPage */}
      <QuizPage isHelpOpen={isHelpOpen} isFirstQuiz={isFirstQuiz} />

      {/* QuizNavigation */}
      {currentQuestion && (
        <QuizNavigation isHelpOpen={isHelpOpen} isFirstQuiz={isFirstQuiz} />
      )}
    </>
  );
}
