"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import clsx from "clsx";
import { QuestionItem } from "@/store/useAppStore";

interface ChoiceQuestionProps {
  questionData: QuestionItem;
  answer: string | string[] | null;
  setAnswer: (answer: string | string[]) => void;
  multiple?: boolean; // decides between single/multi choice
}

type ImageOption = { label: string; imageUrl?: string };

// =================== OptionButton ===================
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
        "relative p-6 rounded-lg border transition-all duration-200 text-left flex flex-col items-start gap-2",
        {
          "border-primary-500 bg-primary-50 dark:border-white dark:bg-secondary-800 shadow-lg":
            isSelected,
          "border-neutral-300 hover:bg-primary-50 dark:border-secondary-500 dark:hover:bg-secondary-800 dark:bg-secondary-900":
            !isSelected,
        }
      )}
    >
      {isSelected && (
        <span className="absolute -top-3 right-4 p-1 bg-primary-500 dark:bg-white dark:text-secondary-900 text-white rounded-lg">
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

// =================== ChoiceQuestion ===================
const ChoiceQuestion = ({
  questionData,
  answer,
  setAnswer,
  multiple = false,
}: ChoiceQuestionProps) => {
  const [showAllOptions, setShowAllOptions] = useState(false);

  // =================== selectedOptions ===================
  const selectedOptions: string[] = useMemo(
    () =>
      multiple
        ? Array.isArray(answer)
          ? answer
          : []
        : answer
        ? [answer as string]
        : [],
    [answer, multiple]
  );

  const minSelected = questionData.validation?.minSelected ?? 0;
  const maxSelected = questionData.validation?.maxSelected ?? Infinity;
  const required = questionData.validation?.required ?? false;
  const errorMessage = questionData.validation?.errorMessage ?? "";

  // =================== validation بدون state ===================
  const selectionError = useMemo(() => {
    if (required && selectedOptions.length === 0)
      return errorMessage || `Please select at least ${minSelected} option(s).`;
    if (selectedOptions.length < minSelected)
      return errorMessage || `Please select at least ${minSelected} option(s).`;
    if (selectedOptions.length > maxSelected)
      return errorMessage || `Please select at most ${maxSelected} option(s).`;
    return "";
  }, [selectedOptions, required, minSelected, maxSelected, errorMessage]);

  // =================== handleClick با بررسی تغییر واقعی ===================
  const handleClick = useCallback(
    (text: string) => {
      if (multiple) {
        let newOptions: string[];
        if (selectedOptions.includes(text)) {
          newOptions = selectedOptions.filter((opt) => opt !== text);
        } else {
          if (selectedOptions.length >= maxSelected) return;
          newOptions = [...selectedOptions, text];
        }
        // فقط اگر array تغییر کرده بود setAnswer
        if (
          newOptions.length !== selectedOptions.length ||
          newOptions.some((val, i) => val !== selectedOptions[i])
        ) {
          setAnswer(newOptions);
        }
      } else {
        if (answer !== text) setAnswer(text);
      }
    },
    [multiple, selectedOptions, setAnswer, answer, maxSelected]
  );

  // =================== handleClickOption ثابت برای React.memo ===================
  const handleClickOption = useCallback(
    (text: string) => () => handleClick(text),
    [handleClick]
  );

  // =================== getOptionData ===================
  const getOptionData = useCallback((option: string | ImageOption) => {
    if (typeof option === "string") return { text: option, imageUrl: undefined };
    return { text: option.label, imageUrl: option.imageUrl };
  }, []);

  const options = questionData.options ?? [];
  const initialOptions = options.slice(0, 4);
  const remainingOptions = options.slice(4);

  const renderOptions = useCallback(
    (opts: (string | ImageOption)[]) =>
      opts.map((option) => {
        const { text, imageUrl } = getOptionData(option);
        return (
          <OptionButton
            key={text}
            text={text}
            imageUrl={imageUrl}
            isSelected={selectedOptions.includes(text)}
            onClick={handleClickOption(text)}
          />
        );
      }),
    [getOptionData, handleClickOption, selectedOptions]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:pb-[80px]">
      {renderOptions(initialOptions)}
      {showAllOptions && renderOptions(remainingOptions)}

      {!showAllOptions && remainingOptions.length > 0 && (
        <div className="col-span-full text-center">
          <button
            onClick={() => setShowAllOptions(true)}
            className="py-3 px-7 text-primary-500 border border-dashed border-neutral-400 rounded hover:bg-primary-50 dark:border-secondary-500 dark:text-secondary-500 dark:hover:bg-secondary-800"
          >
            More Options
          </button>
        </div>
      )}

      {selectionError && (
        <p className="text-red-500 text-sm mt-1 col-span-full">{selectionError}</p>
      )}
    </div>
  );
};

export default ChoiceQuestion;
