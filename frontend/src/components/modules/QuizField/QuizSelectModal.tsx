"use client";

import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useQuizStore, Question } from "@/store/mainQuizStore";

interface QuizSelectModalProps {
  question: Question;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuizSelectModal({ question, isOpen, onClose }: QuizSelectModalProps) {
  const setAnswer = useQuizStore((state) => state.setAnswer);
  const [tempSelection, setTempSelection] = useState<string[]>(
    question.answer && Array.isArray(question.answer) ? question.answer : []
  );

  // وقتی modal باز شد، مقدار قبلی را بارگذاری کن
  useEffect(() => {
    if (isOpen) {
      setTempSelection(
        question.answer && Array.isArray(question.answer) ? question.answer : []
      );
    }
  }, [isOpen, question.answer]);

  const toggleOption = (option: string) => {
    if (question.multiple) {
      // برای چند انتخابی
      setTempSelection((prev) =>
        prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
      );
    } else {
      // برای انتخاب تکی
      setTempSelection([option]);
    }
  };

  const handleSubmit = () => {
    setAnswer(question.id, question.multiple ? tempSelection : tempSelection[0] || null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{question.title}</h3>
          <button aria-label="close" onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-white">
            <IoClose size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
          {question.options?.map((option) => {
            const selected = tempSelection.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggleOption(option)}
                className={`flex items-center justify-between px-4 py-2 border rounded-lg text-sm
                  ${selected ? "bg-primary-50 dark:bg-secondary-700 border-primary-500 dark:border-white font-medium" 
                            : "border-gray-300 dark:border-secondary-600 hover:bg-gray-100 dark:hover:bg-secondary-700"}`}
              >
                <span className="text-gray-800 dark:text-white">{option}</span>
                {selected && (
                  <div className="w-5 h-5 rounded-full bg-primary-500 dark:bg-white flex items-center justify-center text-white dark:text-black">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-secondary-600 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-secondary-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}