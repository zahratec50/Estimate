"use client";

import { useCallback, useState, useEffect } from "react";
import { QuestionItem, AnswerValue } from "@/store/useAppStore";

interface Props {
  question: QuestionItem;
  selectedAnswer: string[];
  setAnswer: (question: QuestionItem, answer: AnswerValue, isFirstQuiz: boolean) => void;
  isFirstQuiz: boolean;
}

export function CheckboxQuestion({ question, selectedAnswer, setAnswer, isFirstQuiz }: Props) {
  const [selected, setSelected] = useState<string[]>(selectedAnswer || []);

  // همگام‌سازی selected با selectedAnswer
  useEffect(() => {
    setSelected(selectedAnswer || []);
  }, [selectedAnswer]);

  const toggleOption = useCallback(
    (option: string) => {
      const newSelected = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option];
      setSelected(newSelected);
      setAnswer(question, newSelected, isFirstQuiz); // فراخوانی در پاسخ به رویداد
    },
    [selected, setAnswer, question, isFirstQuiz]
  );

  return (
    <div className="space-y-2">
      {question.options?.map((option) => (
        <label key={typeof option === "string" ? option : option.label} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selected.includes(typeof option === "string" ? option : option.label)}
            onChange={() => toggleOption(typeof option === "string" ? option : option.label)}
            className="h-5 w-5 text-primary-500 focus:ring-primary-500"
          />
          <span>{typeof option === "string" ? option : option.label}</span>
        </label>
      ))}
    </div>
  );
}