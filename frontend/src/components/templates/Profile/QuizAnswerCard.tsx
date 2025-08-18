"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { memo, useCallback } from "react";

interface QuizAnswerCardProps {
  question: string;
  answer: string;
  onChange: (value: string) => void;
}

export const QuizAnswerCard = memo(({ question, answer, onChange }: QuizAnswerCardProps) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="p-4 bg-white dark:bg-secondary-800 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
    >
      <p className="font-medium text-gray-700 dark:text-gray-200 mb-2">{question}</p>
      <Input value={answer} onChange={handleChange} />
    </motion.div>
  );
});
