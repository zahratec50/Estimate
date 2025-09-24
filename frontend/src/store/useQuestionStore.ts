"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Question {
  id: string;
  text: string;
  askedAt: string;
  userId: string;
  answer?: string;
}

interface QuestionState {
  questions: Question[];
  addQuestion: (question: Question) => void;
  answerQuestion: (id: string, answer: string) => void;
}

export const useQuestionStore = create<QuestionState>()(
  persist(
    (set) => ({
      questions: [],
      addQuestion: (question) => {
        set((state) => ({
          questions: [...state.questions, question],
        }));
      },
      answerQuestion: (id, answer) => {
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === id ? { ...q, answer } : q
          ),
        }));
      },
    }),
    {
      name: "question-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);