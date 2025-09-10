"use client";

import { useState, useEffect } from "react";
import { QuestionItem, AnswerValue } from "@/store/useAppStore";

interface Props {
  question: QuestionItem;
  selectedAnswer: string | null;
  setAnswer: (
    question: QuestionItem,
    answer: AnswerValue,
    isFirstQuiz: boolean
  ) => void;
  isFirstQuiz: boolean;
}

export const RadioQuestion = ({
  question,
  selectedAnswer,
  setAnswer,
  isFirstQuiz,
}: Props) => {
  const [selected, setSelected] = useState<string>(selectedAnswer || "");

  useEffect(() => {
    setSelected(selectedAnswer || "");
  }, [selectedAnswer]);

  const handleSelect = (val: string) => {
    setSelected(val);
    setAnswer(question, val, isFirstQuiz);
  };

  return (
    <div className="flex flex-col gap-3">
      {question.options?.map((opt, idx) => {
        const value = typeof opt === "string" ? opt : opt.label;
        return (
          <label
            key={idx}
            className="flex items-center gap-2 p-3 rounded-lg cursor-pointer"
          >
            <input
              type="radio"
              name={question.id}
              value={value}
              checked={selected === value}
              onChange={() => handleSelect(value)}
              className="accent-primary-500 w-5 h-5"
            />
            <span className="text-base">{value}</span>
          </label>
        );
      })}
    </div>
  );
};