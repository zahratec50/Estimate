"use client";

import { useAppStore, QuestionItem } from "@/store/useAppStore";
import { useMemo, useEffect, useState, useCallback } from "react";
import firstQuestion from "@/data/firstQuestion.json";
import mainQuizData from "@/data/mainQuizData.json";

import SingleChoiceQuestion from "@/components/modules/QuizField/SingleChoiceQuestion";
import MultiChoiceQuestion from "@/components/modules/QuizField/MultiChoiceQuestion";
import SelectQuestion from "@/components/modules/QuizField/SelectQuestion";
import TextInputQuestion from "@/components/modules/QuizField/TextInputQuestion";
import ImageQuestion from "@/components/modules/QuizField/ImageQuestion";

type QuestionProps = {
  isHelpOpen: boolean;
  isFirstQuiz: boolean;
};

export default function QuizPage({ isHelpOpen, isFirstQuiz }: QuestionProps) {
  // ✅ Selectors جدا برای حداقل ری‌رندر
  const currentStepFirstQuiz = useAppStore((s) => s.currentStepFirstQuiz);
  const currentStepMainQuiz = useAppStore((s) => s.currentStepMainQuiz);
  const projects = useAppStore((s) => s.projects);
  const currentProjectId = useAppStore((s) => s.currentProjectId);
  const preQuizAnswers = useAppStore((s) => s.preQuizAnswers);
  const mainQuizAnswersTemp = useAppStore((s) => s.mainQuizAnswersTemp);

  const setAnswer = useAppStore((s) => s.setAnswer);

  const currentStep = isFirstQuiz ? currentStepFirstQuiz : currentStepMainQuiz;
  const quiz = isFirstQuiz ? firstQuestion : mainQuizData;

  // ✅ تعیین سوال جاری با useMemo
  const questionData: QuestionItem | null = useMemo(() => {
    return currentStep >= 1 && currentStep <= quiz.length
      ? quiz[currentStep - 1]
      : null;
  }, [currentStep, quiz]);

  // ✅ پاسخ جاری با useMemo
  const selectedAnswer = useAppStore(
    useCallback(
      (state) => {
        if (!questionData?.title) return null;

        if (!isFirstQuiz && currentProjectId) {
          const project = state.projects.find((p) => p.id === currentProjectId);
          return (
            project?.mainQuizAnswers.find(
              (a) => a.question === questionData.title
            )?.answer ?? null
          );
        }

        return (
          state.preQuizAnswers.find((a) => a.question === questionData.title)
            ?.answer ?? null
        );
      },
      [questionData?.title, isFirstQuiz, currentProjectId]
    )
  );

  // ✅ ذخیره پاسخ
  const saveAnswerHandler = useCallback(
    (answer: string | string[]) => {
      if (!questionData) return;
      setAnswer(questionData, answer, isFirstQuiz);
    },
    [questionData, isFirstQuiz, setAnswer]
  );

  // ✅ inputValue فقط برای text-input
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (questionData?.type === "text-input") {
      if (selectedAnswer) {
        setInputValue(
          Array.isArray(selectedAnswer)
            ? selectedAnswer.join("")
            : selectedAnswer
        );
      } else {
        setInputValue("");
      }
    }
  }, [selectedAnswer, questionData]);

  const handleInputChange = useCallback(
    (answer: string | string[]) => {
      const val = Array.isArray(answer) ? answer.join("") : answer;
      setInputValue(val);

      if (questionData?.type === "text-input" && val.trim().length >= 1) {
        saveAnswerHandler(val);
      }
    },
    [questionData?.type, saveAnswerHandler]
  );

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
      <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-blackNew-50 mb-10 dark:text-white">
        {questionData.title}
      </h1>

      {questionData.type === "single-choice" &&
      questionData.options.length > 0 ? (
        <SingleChoiceQuestion
          questionData={
            questionData as Extract<QuestionItem, { type: "single-choice" }>
          }
          selectedAnswer={selectedAnswer}
          setAnswer={saveAnswerHandler}
          error=""
        />
      ) : questionData.type === "multi-choice" &&
        questionData.options.length > 0 ? (
        <MultiChoiceQuestion
          questionData={
            questionData as Extract<QuestionItem, { type: "multi-choice" }>
          }
          selectedAnswer={selectedAnswer as string[]}
          setAnswer={saveAnswerHandler}
        />
      ) : questionData.type === "select" && questionData.options.length > 0 ? (
        <SelectQuestion
          questionData={
            questionData as Extract<QuestionItem, { type: "select" }>
          }
          selectedAnswer={selectedAnswer}
          setAnswer={saveAnswerHandler}
          isFirstQuiz={isFirstQuiz}
        />
      ) : questionData.type === "text-input" ? (
        <TextInputQuestion
          questionData={
            questionData as Extract<QuestionItem, { type: "text-input" }>
          }
          selectedAnswer={inputValue}
          setAnswer={handleInputChange}
        />
      ) : questionData.type === "image-choice" ? (
        <ImageQuestion
          questionData={
            questionData as Extract<QuestionItem, { type: "image-choice" }>
          }
          isFirstQuiz={isFirstQuiz}
          setAnswer={saveAnswerHandler}
        />
      ) : (
        <div className="text-red-500 dark:text-red-300">
          Invalid question format.
        </div>
      )}
    </div>
  );
}
