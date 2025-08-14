import { IoCheckmarkOutline } from "react-icons/io5";
import clsx from "clsx";
import { useState } from "react";

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

interface SingleChoiceQuestionProps {
  questionData: QuestionItem;
  selectedAnswer: string | string[] | null;
  setAnswer: (answer: string | string[]) => void;
  error: string;
}

export default function SingleChoiceQuestion({
  questionData,
  selectedAnswer,
  setAnswer,
  error,
}: SingleChoiceQuestionProps) {
  const [showAllOptions, setShowAllOptions] = useState(false);
  const handleSingleOptionClick = (answer: string) => {
    setAnswer(answer);
  };

  const initialOptions = questionData.options.slice(0, 4);
  const remainingOptions = questionData.options.slice(4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:pb-[80px]">
      {initialOptions.map((option: string, index: number) => {
        const isSelected = selectedAnswer === option;
        return (
          <button
            key={index}
            onClick={() => handleSingleOptionClick(option)}
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
            <h3 className="text-lg sm:text-xl text-black-50 dark:text-white font-medium">
              {option}
            </h3>
          </button>
        );
      })}

      {showAllOptions &&
        remainingOptions.map((option: string, index: number) => {
          const isSelected = selectedAnswer === option;
          return (
            <button
              key={index + 4} // کلید یکتا
              onClick={() => handleSingleOptionClick(option)}
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
              <h3 className="text-lg sm:text-xl text-black-50 dark:text-white font-medium">
                {option}
              </h3>
            </button>
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

      {error && (
        <p className="text-red-500 text-sm mt-1 col-span-full">{error}</p>
      )}
    </div>
  );
}
