"use client";

import { useState, useCallback } from "react";
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

export default function QuizPage({ currentStep }: { currentStep: number }) {
  const isValidStep =
    typeof currentStep === "number" &&
    currentStep >= 1 &&
    currentStep <= questions.length;

  const questionData = isValidStep ? questions[currentStep - 1] : null;
  console.log(questionData);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionClick = useCallback((index: number) => {
    setSelectedOption(index);
  }, []);

  if (!questionData) {
    return (
      <div className="w-full text-center mt-10 text-red-500 text-lg">
        Question not found. Please check the URL or step number.
      </div>
    );
  }

  return (
    <div className="w-full max-w-[800] font-roboto px-4 sm:px-0">
      {/* Question Title */}
      <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-black-50 mb-2">
        Question: {questionData.question}
      </h1>

      {/* Subtitle */}
      <p className="text-md md:text-lg lg:text-xl text-neutral-700 mb-6">
        Hint: {questionData.hint}
      </p>

      {/* Options */}
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
                  "border-primary-500 bg-primary-50 shadow-lg": isSelected,
                  "border-neutral-300 bg-white hover:bg-neutral-50":
                    !isSelected,
                }
              )}
            >
              {isSelected && (
                <span className="absolute -top-3 right-4 p-1 bg-primary-500 text-white rounded-lg">
                  <IoCheckmarkOutline />
                </span>
              )}
              <h3 className="text-lg sm:text-xl text-black-50 font-medium">
                {option.title}
              </h3>
              <p className="text-xs sm:text-sm text-secondary-600">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
