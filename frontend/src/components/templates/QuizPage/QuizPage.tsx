"use client";

import { useAppStore } from "@/store/useAppStore";
import { useEffect, useMemo } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import clsx from "clsx";

const questions = [
  {
    question: "What is 2 + 2?",
    hint: "It's the result of adding two pairs.",
    options: [
      { title: "3", description: "Not quite right" },
      { title: "4", description: "Correct answer" },
      { title: "5", description: "Too high" },
      { title: "22", description: "This is a trick!" },
    ],
  },
  {
    question: "What is the capital of France?",
    hint: "City of lights.",
    options: [
      { title: "London", description: "That's the UK." },
      { title: "Paris", description: "Correct!" },
      { title: "Berlin", description: "That's Germany." },
      { title: "Madrid", description: "That's Spain." },
    ],
  },
  {
    question: "Which is a JavaScript framework?",
    hint: "It starts with 'R'.",
    options: [
      { title: "Laravel", description: "PHP framework" },
      { title: "Django", description: "Python framework" },
      { title: "React", description: "Yes!" },
      { title: "Ruby", description: "A language, not JS framework" },
    ],
  },
  {
    question:
      "What color do you get by mixing red and white and white and white and white and white and white?",
    hint: "It's a shade often associated with calm and love.",
    options: [
      { title: "Pink", description: "Correct!" },
      { title: "Purple", description: "Not quite right" },
      { title: "Orange", description: "Nope" },
      { title: "Brown", description: "Too dull!" },
    ],
  },
];

type QuestionProps = {
  isHelpOpen: boolean;
}

export default function QuizPage({ isHelpOpen }: QuestionProps) {
  const currentStep = useAppStore((state) => state.currentStep)
  const isRegistered = useAppStore((state) => state.isRegistered);
  const currentProjectId = useAppStore((state) => state.currentProjectId);
  const setPreQuizAnswer = useAppStore((state) => state.setPreQuizAnswer);
  const setMainQuizAnswer = useAppStore((state) => state.setMainQuizAnswer);

  const selectedOption = useAppStore((state) => {
  if (isRegistered && currentProjectId) {
    const project = state.projects.find((p) => p.id === currentProjectId);
    return project?.mainQuizAnswers.find((a) => a.questionIndex === currentStep - 1)?.selectedOption ?? null;
  }
  return state.preQuizAnswers.find((a) => a.questionIndex === currentStep - 1)?.selectedOption ?? null;
});

  const questionData = useMemo(() => {
    return currentStep >= 1 && currentStep <= questions.length
      ? questions[currentStep - 1]
      : null;
  }, [currentStep]);

  const handleOptionClick = (index: number) => {
    if (isRegistered && currentProjectId) {
      setMainQuizAnswer(currentProjectId, currentStep - 1, index);
    } else {
      setPreQuizAnswer(currentStep - 1, index);
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
    <div className={`w-full  ${isHelpOpen ? 'max-w-[800px]' : 'max-w-full'} font-roboto px-4 sm:px-0`}>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-black-50 mb-2 dark:text-white">
        Question: {questionData.question}
      </h1>
      <p className="text-md md:text-lg lg:text-xl text-neutral-700 dark:text-secondary-300 mb-6">
        Hint: {questionData.hint}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:pb-[80px]">
        {questionData.options.map((option, index) => {
          const isSelected = selectedOption === index;
          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={clsx(
                "relative p-4 rounded-lg border transition-all duration-200 text-left",
                {
                  "border-primary-500 bg-primary-50 dark:border-secondary-500 dark:bg-secondary-800 shadow-lg":
                    isSelected,
                  "border-neutral-300 hover:bg-primary-50 dark:border-secondary-500 dark:hover:bg-secondary-800 dark:bg-secondary-900":
                    !isSelected,
                }
              )}
            >
              {isSelected && (
                <span className="absolute -top-3 right-4 p-1 bg-primary-500 dark:bg-secondary-500 dark:text-secondary-900 text-white rounded-lg">
                  <IoCheckmarkOutline />
                </span>
              )}
              <h3 className="text-lg sm:text-xl text-black-50 dark:text-white font-medium">
                {option.title}
              </h3>
              <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
