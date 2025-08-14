"use client";

import { useAppStore } from "@/store/useAppStore";
import { useMemo } from "react";
import firstQuestion from "@/data/firstQuestion.json";
import mainQuizData from "@/data/mainQuizData.json";
import SingleChoiceQuestion from "@/components/modules/QuizField/SingleChoiceQuestion";
import MultiChoiceQuestion from "@/components/modules/QuizField/MultiChoiceQuestion";
import SelectQuestion from "@/components/modules/QuizField/SelectQuestion";
import TextInputQuestion from "@/components/modules/QuizField/TextInputQuestion";

type QuestionProps = {
  isHelpOpen: boolean;
  isFirstQuiz: boolean;
};

interface ImageOption {
  label: string;
  imageUrl: string;
}

type QuestionItem = {
  id: number;
  type:
    | "single-choice"
    | "multi-choice"
    | "select"
    | "text-input"
    | "image-choice";
  title: string;
  options: string[] | ImageOption[];
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

export default function QuizPage({ isHelpOpen, isFirstQuiz }: QuestionProps) {
  const currentStep = useAppStore((state) =>
    isFirstQuiz ? state.currentStepFirstQuiz : state.currentStepMainQuiz
  );
  const setCurrentStep = useAppStore((state) =>
    isFirstQuiz ? state.setCurrentStepFirstQuiz : state.setCurrentStepMainQuiz
  );
  const isRegistered = useAppStore((state) => state.isRegistered);
  const currentProjectId = useAppStore((state) => state.currentProjectId);
  const setPreQuizAnswer = useAppStore((state) => state.setPreQuizAnswer);
  const setMainQuizAnswer = useAppStore((state) => state.setMainQuizAnswer);

  const quiz = isFirstQuiz ? firstQuestion : mainQuizData;

  const questionData: QuestionItem | null = useMemo(() => {
    return currentStep >= 1 && currentStep <= quiz.length
      ? quiz[currentStep - 1]
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

      {questionData.type === "single-choice" &&
      questionData.options.length > 0 ? (
        <SingleChoiceQuestion
          questionData={
            questionData as Extract<QuestionItem, { type: "single-choice" }>
          }
          selectedAnswer={selectedAnswer}
          setAnswer={saveAnswer}
          error=""
        />
      ) : questionData.type === "multi-choice" &&
        questionData.options.length > 0 ? (
        <MultiChoiceQuestion
          questionData={
            questionData as Extract<QuestionItem, { type: "multi-choice" }>
          }
          selectedAnswer={selectedAnswer}
          setAnswer={saveAnswer}
        />
      ) : questionData.type === "select" && questionData.options.length > 0 ? (
        <SelectQuestion
          questionData={
            questionData as Extract<QuestionItem, { type: "select" }>
          }
          selectedAnswer={selectedAnswer}
          setAnswer={saveAnswer}
          isFirstQuiz={isFirstQuiz}
        />
      ) : questionData.type === "text-input" ? (
        <TextInputQuestion
          questionData={
            questionData as Extract<QuestionItem, { type: "text-input" }>
          }
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
