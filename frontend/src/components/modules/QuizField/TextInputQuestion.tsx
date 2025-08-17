"use client";

import { useState, useEffect, useCallback, memo } from "react";
import clsx from "clsx";

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
  fields?: Array<{
    label: string;
    placeholder: string;
    validation: { required: boolean; pattern: string; errorMessage: string };
  }>;
}

interface TextInputQuestionProps {
  questionData: QuestionItem;
  selectedAnswer: string | string[] | null;
  setAnswer: (answer: string | string[]) => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const usPhoneRegex = /^(?:\+1\s?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;

const TextInputQuestion = memo(function TextInputQuestion({
  questionData,
  selectedAnswer,
  setAnswer,
}: TextInputQuestionProps) {
  const [contactInput, setContactInput] = useState<string>("");
  const [contactError, setContactError] = useState<string>("");

  // بارگذاری پاسخ قبلی
  useEffect(() => {
    if (questionData.type === "text-input" && selectedAnswer) {
      setContactInput(typeof selectedAnswer === "string" ? selectedAnswer : "");
    } else {
      setContactInput("");
    }
  }, [selectedAnswer, questionData]);

  const validateInput = useCallback(
    (val: string) => {
      const trimmed = val.trim();
      const isValid = emailRegex.test(trimmed) || usPhoneRegex.test(trimmed);

      if (trimmed === "") {
        setContactError(
          questionData.validation.errorMessage || "This field is required."
        );
      } else if (!isValid) {
        setContactError(
          questionData.fields?.[0]?.validation.errorMessage ||
            "Please enter a valid email or US phone number."
        );
      } else {
        setContactError("");
      }
    },
    [questionData]
  );

  const handleInputChange = useCallback(
    (val: string) => {
      setContactInput(val);
      setAnswer(val);
      validateInput(val);
    },
    [setAnswer, validateInput]
  );

  return (
    <div className="col-span-full md:w-1/2 flex flex-col mt-4 sm:pb-[80px]">
      <input
        type="text"
        placeholder="Email or Phone Number"
        className={clsx(
          "w-full border p-2 rounded-lg outline-primary-500",
          contactError
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-primary-500"
        )}
        value={contactInput}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      {contactError && (
        <p className="text-red-500 text-sm mt-1">{contactError}</p>
      )}
    </div>
  );
});

export default TextInputQuestion;
