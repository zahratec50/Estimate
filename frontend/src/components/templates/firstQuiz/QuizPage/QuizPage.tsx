"use client";

import { useAppStore } from "@/store/useAppStore";
import { useMemo } from "react";
import firstQuestion from "@/data/firstQuestion.json";
import SingleChoiceQuestion from "@/components/modules/QuizField/SingleChoiceQuestion";
import MultiChoiceQuestion from "@/components/modules/QuizField/MultiChoiceQuestion";
import SelectQuestion from "@/components/modules/QuizField/SelectQuestion";
import TextInputQuestion from "@/components/modules/QuizField/TextInputQuestion";

type QuestionProps = {
  isHelpOpen: boolean;
};

type QuestionItem = {
  id: number;
  type: "single-choice" | "multi-choice" | "select" | "text-input";
  title: string;
  options: string[];
  multiple?: boolean;
  validation: {
    required: boolean;
    errorMessage: string;
    minSelected?: number;
    maxSelected?: number;
    pattern?: string;
  };
  fields?: Array<{
    label: string;
    placeholder: string;
    validation: { required: boolean; pattern: string; errorMessage: string };
  }>;
};

export default function QuizPage({ isHelpOpen }: QuestionProps) {
  const currentStep = useAppStore((state) => state.currentStep);
  const isRegistered = useAppStore((state) => state.isRegistered);
  const currentProjectId = useAppStore((state) => state.currentProjectId);
  const setPreQuizAnswer = useAppStore((state) => state.setPreQuizAnswer);
  const setMainQuizAnswer = useAppStore((state) => state.setMainQuizAnswer);

  const questionData: QuestionItem | null = useMemo(() => {
    return currentStep >= 1 && currentStep <= firstQuestion.length
      ? firstQuestion[currentStep - 1]
      : null;
  }, [currentStep]);

  const selectedAnswer = useAppStore((state) => {
    const questionText = questionData?.title;
    if (!questionText) return null;

    if (isRegistered && currentProjectId) {
      const project = state.projects.find((p) => p.id === currentProjectId);
      return (
        project?.mainQuizAnswers.find((a) => a.question === questionText)
          ?.answer ?? null
      );
    }

    return (
      state.preQuizAnswers.find((a) => a.question === questionText)?.answer ??
      null
    );
  });

  const saveAnswer = (answer: string | string[]) => {
    const questionText = questionData?.title;
    if (!questionText) return;

    if (isRegistered && currentProjectId) {
      setMainQuizAnswer(currentProjectId, questionText, answer);
    } else {
      setPreQuizAnswer(questionText, answer);
    }
  };

  if (!questionData) {
    return (
      <div className="w-full text-center mt-10 text-red-500 dark:text-red-300 text-lg">
        Question not found. Please check the URL or step number.
      </div>
    );
  }

  return (
    <div
      className={`w-full ${
        isHelpOpen ? "max-w-[800px]" : "max-w-full"
      } font-roboto px-4 sm:px-0`}
    >
      <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-black-50 mb-10 dark:text-white">
        {questionData.title}
      </h1>

      {questionData.type === "single-choice" && questionData.options.length > 0 ? (
        <SingleChoiceQuestion
          questionData={questionData}
          selectedAnswer={selectedAnswer}
          setAnswer={saveAnswer}
          error=""
        />
      ) : questionData.type === "multi-choice" && questionData.options.length > 0 ? (
        <MultiChoiceQuestion
          questionData={questionData}
          selectedAnswer={selectedAnswer}
          setAnswer={saveAnswer}
        />
      ) : questionData.type === "select" && questionData.options.length > 0 ? (
        <SelectQuestion
          questionData={questionData}
          selectedAnswer={selectedAnswer}
          setAnswer={saveAnswer}
        />
      ) : questionData.type === "text-input" ? (
        <TextInputQuestion
          questionData={questionData}
          selectedAnswer={selectedAnswer}
          setAnswer={saveAnswer}
        />
      ) : (
        <div className="text-red-500 dark:text-red-300">
          Invalid question format.
        </div>
      )}
    </div>
  );
}