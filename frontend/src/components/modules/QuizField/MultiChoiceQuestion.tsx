"use client";

import React, { useState, useEffect, useCallback } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import clsx from "clsx";
import { QuestionItem } from "@/store/useAppStore";

interface MultiChoiceQuestionProps {
  questionData: QuestionItem;
  selectedAnswer: string | string[] | null;
  setAnswer: (answer: string[]) => void; // فقط array از string
}

const MultiChoiceQuestion = React.memo(function MultiChoiceQuestion({
  questionData,
  selectedAnswer,
  setAnswer,
}: MultiChoiceQuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectionError, setSelectionError] = useState("");

  // بارگذاری پاسخ قبلی
  useEffect(() => {
    if (questionData.type === "multi-choice" && selectedAnswer) {
      setSelectedOptions(Array.isArray(selectedAnswer) ? selectedAnswer : []);
    } else {
      setSelectedOptions([]);
    }
  }, [selectedAnswer, questionData]);

  // اعتبارسنجی انتخاب‌ها
  useEffect(() => {
    const min = questionData.validation.minSelected ?? 0;
    const max = questionData.validation.maxSelected ?? Infinity;
    const length = selectedOptions.length;

    let error = "";
    if (questionData.validation.required && length === 0) {
      error = questionData.validation.errorMessage;
    } else if (length < min) {
      error =
        questionData.validation.errorMessage ||
        `لطفاً حداقل ${min} گزینه انتخاب کنید.`;
    } else if (length > max) {
      error =
        questionData.validation.errorMessage ||
        `لطفاً حداکثر ${max} گزینه انتخاب کنید.`;
    }
    setSelectionError(error);
  }, [selectedOptions, questionData.validation]);

  const handleOptionClick = useCallback(
    (option: string) => {
      const value = typeof option === "string" ? option : option;
      setSelectedOptions((prev) => {
        const newOptions = prev.includes(option)
          ? prev.filter((opt) => opt !== option)
          : [...prev, option];
        setAnswer(newOptions); // ذخیره پاسخ در استور یا والد
        return newOptions;
      });
    },
    [setAnswer]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:pb-[80px]">
      {questionData.options.map((option, index) => {
        const isSelected = selectedOptions.includes(option as string);
        return (
          <label
            key={index}
            className={clsx(
              "relative p-6 rounded-lg border transition-all duration-200 flex items-center cursor-pointer",
              {
                "border-primary-500 bg-primary-50 dark:border-secondary-500 dark:bg-secondary-800 shadow-lg":
                  isSelected,
                "border-neutral-300 hover:bg-primary-50 dark:border-secondary-500 dark:hover:bg-secondary-800 dark:bg-secondary-900":
                  !isSelected,
              }
            )}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleOptionClick(option as string)}
              className="mr-2"
            />
            <h3 className="text-lg sm:text-xl text-black-50 dark:text-white font-medium">
              {option as string}
            </h3>
            {isSelected && (
              <span className="absolute -top-3 right-4 p-1 bg-primary-500 dark:bg-secondary-500 dark:text-secondary-900 text-white rounded-lg">
                <IoCheckmarkOutline />
              </span>
            )}
          </label>
        );
      })}
      {selectionError && (
        <p className="text-red-500 text-sm mt-1 col-span-full">{selectionError}</p>
      )}
    </div>
  );
});

export default MultiChoiceQuestion;
