import { IoCheckmarkOutline } from "react-icons/io5";
import clsx from "clsx";
import { useState, useEffect } from "react";

interface QuestionItem {
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
}

interface MultiChoiceQuestionProps {
  questionData: QuestionItem;
  selectedAnswer: string | string[] | null;
  setAnswer: (answer: string | string[]) => void;
}

export default function MultiChoiceQuestion({
  questionData,
  selectedAnswer,
  setAnswer,
}: MultiChoiceQuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectionError, setSelectionError] = useState("");

  useEffect(() => {
    if (questionData.type === "multi-choice" && selectedAnswer) {
      setSelectedOptions(
        Array.isArray(selectedAnswer) ? selectedAnswer : []
      );
    } else {
      setSelectedOptions([]);
    }
  }, [selectedAnswer, questionData]);

  useEffect(() => {
    if (questionData.validation.required && !selectedAnswer) {
      setSelectionError(questionData.validation.errorMessage);
    } else if (
      questionData.type === "multi-choice" &&
      selectedAnswer &&
      questionData.validation.minSelected &&
      (Array.isArray(selectedAnswer) ? selectedAnswer.length : 0) <
        questionData.validation.minSelected
    ) {
      setSelectionError(
        questionData.validation.errorMessage ||
          `Please select at least ${questionData.validation.minSelected} option(s).`
      );
    } else if (
      questionData.type === "multi-choice" &&
      selectedAnswer &&
      questionData.validation.maxSelected &&
      (Array.isArray(selectedAnswer) ? selectedAnswer.length : 0) >
        questionData.validation.maxSelected
    ) {
      setSelectionError(
        questionData.validation.errorMessage ||
          `Please select at most ${questionData.validation.maxSelected} option(s).`
      );
    } else {
      setSelectionError("");
    }
  }, [selectedAnswer, questionData]);

  const handleMultiOptionClick = (option: string) => {
    const newOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((opt) => opt !== option)
      : [...selectedOptions, option];
    setSelectedOptions(newOptions);
    setAnswer(newOptions);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:pb-[80px]">
      {questionData.options.map((option: string, index: number) => {
        const isSelected = selectedOptions.includes(option);
        return (
          <label
            key={index}
            className={clsx(
              "relative p-6 rounded-lg border transition-all duration-200 flex items-center",
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
              onChange={() => handleMultiOptionClick(option)}
              className="mr-2"
            />
            <h3 className="text-lg sm:text-xl text-black-50 dark:text-white font-medium">
              {option}
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
        <p className="text-red-500 text-sm mt-1 col-span-full">
          {selectionError}
        </p>
      )}
    </div>
  );
}