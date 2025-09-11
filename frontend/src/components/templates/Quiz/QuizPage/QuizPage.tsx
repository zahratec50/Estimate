"use client";

import { useAppStore, QuestionItem } from "@/store/useAppStore";
import { useMemo, useEffect, useCallback } from "react";
import firstQuestion from "@/data/firstQuestion.json";
import mainQuizData from "@/data/mainQuizData.json";

import ChoiceQuestion from "@/components/modules/QuizField/ChoiceQuestion";
import { TextInputQuestion } from "@/components/modules/QuizField/TextInputQuestion";
import { NumberSliderQuestion } from "@/components/modules/QuizField/NumberSliderQuestion";
import SelectQuestion from "@/components/modules/QuizField/SelectQuestion";
import { FileQuestion } from "@/components/modules/QuizField/FileQuestion";
import { CheckboxQuestion } from "@/components/modules/QuizField/CheckboxQuestion";
import { RadioQuestion } from "@/components/modules/QuizField/RadioQuestion";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ImInfo } from "react-icons/im";

type QuestionProps = {
  isHelpOpen: boolean;
  isFirstQuiz: boolean;
};

export default function QuizPage({ isHelpOpen, isFirstQuiz }: QuestionProps) {
  // =================== Store selectors ===================
  const currentStepFirstQuiz = useAppStore((s) => s.currentStepFirstQuiz);
  const currentStepMainQuiz = useAppStore((s) => s.currentStepMainQuiz);
  const currentProjectId = useAppStore((s) => s.currentProjectId);
  const setAnswer = useAppStore((s) => s.setAnswer);
  const isContinueAllowed = useAppStore((s) => s.isContinueAllowed);
  const setFirstQuizQuestions = useAppStore((s) => s.setFirstQuizQuestions);
  const setMainQuizQuestions = useAppStore((s) => s.setMainQuizQuestions);
  const firstQuizQuestions = useAppStore((s) => s.firstQuizQuestions);
  const mainQuizQuestions = useAppStore((s) => s.mainQuizQuestions);

  const currentStep = isFirstQuiz ? currentStepFirstQuiz : currentStepMainQuiz;
  const quiz = isFirstQuiz ? firstQuizQuestions : mainQuizQuestions;

  // Load questions if not loaded
  useEffect(() => {
    if (isFirstQuiz && firstQuizQuestions.length === 0) {
      setFirstQuizQuestions(firstQuestion);
    } else if (!isFirstQuiz && mainQuizQuestions.length === 0) {
      setMainQuizQuestions(mainQuizData);
    }
  }, [isFirstQuiz, firstQuizQuestions.length, mainQuizQuestions.length, setFirstQuizQuestions, setMainQuizQuestions]);

  // =================== Current Question ===================
  const questionData: QuestionItem | null = useMemo(() => {
    return currentStep >= 1 && currentStep <= quiz.length
      ? quiz[currentStep - 1]
      : null;
  }, [currentStep, quiz]);

  // =================== Selected Answer ===================
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
          state.preQuizAnswers.find(
            (a) => a.question === questionData.title
          )?.answer ?? null
        );
      },
      [questionData?.title, isFirstQuiz, currentProjectId]
    )
  );

  // =================== Save Answer Handler ===================
  const saveAnswerHandler = useCallback(
    (answer: string | string[]) => {
      if (!questionData) return;
      setAnswer(questionData, answer, isFirstQuiz);
    },
    [questionData, isFirstQuiz, setAnswer]
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
      <div className="flex items-start justify-start gap-3">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-blackNew-50 mb-10 dark:text-white">
          {questionData.title}
        </h1>
        {questionData.hint && (
          <Tooltip>
            <TooltipTrigger>
              <ImInfo className="size-5 sm:size-6 lg:size-8 mt-2" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{questionData.hint}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* =================== Question Type Render =================== */}
      {questionData.type === "button" && questionData.options && (
        <ChoiceQuestion
          questionData={questionData}
          answer={selectedAnswer as string | string[]}
          setAnswer={saveAnswerHandler}
          multiple={questionData.multiple ?? false}
        />
      )}

      {questionData.type === "text" && (
        <TextInputQuestion
          question={questionData}
          selectedAnswer={selectedAnswer}
          setAnswer={setAnswer}
          isFirstQuiz={isFirstQuiz}
          onValidationChange={(valid) => {
            console.log("Text validation:", valid);
          }}
        />
      )}

      {questionData.type === "number" && (
        <NumberSliderQuestion
          question={questionData}
          isFirstQuiz={isFirstQuiz}
          selectedAnswer={selectedAnswer as string}
          setAnswer={setAnswer}
        />
      )}

      {questionData.type === "select" && questionData.options && (
        <SelectQuestion
          questionData={questionData}
          selectedAnswer={selectedAnswer as string | string[]}
          setAnswer={saveAnswerHandler}
          isFirstQuiz={isFirstQuiz}
        />
      )}

      {questionData.type === "checkbox" && questionData.options && (
        <CheckboxQuestion
          question={questionData}
          selectedAnswer={selectedAnswer as string[]}
          setAnswer={setAnswer}
          isFirstQuiz={isFirstQuiz}
        />
      )}

      {questionData.type === "radio" && questionData.options && (
        <RadioQuestion
          question={questionData}
          selectedAnswer={selectedAnswer as string}
          setAnswer={setAnswer}
          isFirstQuiz={isFirstQuiz}
        />
      )}

      {questionData.type === "file" && (
        <FileQuestion
          question={questionData}
          selectedAnswer={selectedAnswer as string}
          setAnswer={saveAnswerHandler}
        />
      )}
    </div>
  );
}