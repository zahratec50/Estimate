"use client";

import React, { useState, useEffect } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import clsx from "clsx";
import { QuestionItem } from "@/store/useAppStore";

interface MultiChoiceQuestionProps {
  questionData: QuestionItem;
  selectedAnswer: string[] | null; // پاسخ فعلی از استور
  setAnswer: (answer: string[]) => void; // ذخیره مستقیم در Zustand
}

type ImageOption = {
  label: string;
  imageUrl?: string;
};

// کامپوننت جداگانه برای هر گزینه
const OptionButton = React.memo(function OptionButton({
  text,
  isSelected,
  onClick,
  imageUrl,
}: {
  text: string;
  isSelected: boolean;
  onClick: () => void;
  imageUrl?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative p-6 rounded-lg border transition-all duration-200 text-left",
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
      {imageUrl && (
        <img
          src={imageUrl}
          alt={text}
          className="w-full h-32 object-cover rounded mb-2"
        />
      )}
      <h3 className="text-lg sm:text-xl text-blackNew-50 dark:text-white font-medium">
        {text}
      </h3>
    </button>
  );
});

const MultiChoiceQuestion = React.memo(function MultiChoiceQuestion({
  questionData,
  selectedAnswer,
  setAnswer,
}: MultiChoiceQuestionProps) {
  const [selectionError, setSelectionError] = useState("");
  const [showAllOptions, setShowAllOptions] = useState(false);

  // پاسخ فعلی از Zustand یا prop گرفته می‌شود
  const selectedOptions = selectedAnswer ?? [];

  // اعتبارسنجی انتخاب‌ها
  useEffect(() => {
    const {
      minSelected = 0,
      maxSelected = Infinity,
      required,
      errorMessage,
    } = questionData.validation;
    const length = selectedOptions.length;

    let error = "";
    if (required && length === 0) {
      error = errorMessage;
    } else if (length < minSelected) {
      error = errorMessage || `لطفاً حداقل ${minSelected} گزینه انتخاب کنید.`;
    } else if (length > maxSelected) {
      error = errorMessage || `لطفاً حداکثر ${maxSelected} گزینه انتخاب کنید.`;
    }
    setSelectionError(error);
  }, [selectedOptions, questionData.validation]);

  // کلیک روی گزینه
  const handleOptionClick = (text: string) => {
    const newOptions = selectedOptions.includes(text)
      ? selectedOptions.filter((opt) => opt !== text)
      : [...selectedOptions, text];
    setAnswer(newOptions); // مستقیم در Zustand ذخیره شود
  };

  const initialOptions = questionData.options.slice(0, 4);
  const remainingOptions = questionData.options.slice(4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:pb-[80px]">
      {initialOptions.map((option, index) => {
        const text = typeof option === "string" ? option : option.label;
        const imageUrl =
          typeof option === "string" ? undefined : option.imageUrl;
        return (
          <OptionButton
            key={index}
            text={text}
            imageUrl={imageUrl}
            isSelected={selectedOptions.includes(text)}
            onClick={() => handleOptionClick(text)}
          />
        );
      })}

      {showAllOptions &&
        remainingOptions.map((option, index) => {
          const text = typeof option === "string" ? option : option.label;
          const imageUrl =
            typeof option === "string" ? undefined : option.imageUrl;
          return (
            <OptionButton
              key={index + 4}
              text={text}
              imageUrl={imageUrl}
              isSelected={selectedOptions.includes(text)}
              onClick={() => handleOptionClick(text)}
            />
          );
        })}

      {!showAllOptions && remainingOptions.length > 0 && (
        <div className="col-span-full text-center">
          <button
            onClick={() => setShowAllOptions(true)}
            className="py-3 px-7 text-center text-primary-500 border border-dashed border-neutral-400 rounded hover:bg-primary-50 dark:border-secondary-500 dark:text-secondary-500 dark:hover:bg-secondary-800"
          >
            More Options
          </button>
        </div>
      )}

      {selectionError && (
        <p className="text-red-500 text-sm mt-1 col-span-full">
          {selectionError}
        </p>
      )}
    </div>
  );
});

export default MultiChoiceQuestion;
