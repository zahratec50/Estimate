import { create } from "zustand";
import { persist } from "zustand/middleware";
import firstQuizJSON from "@/data/firstQuestion.json";

export type FieldItem = {
  label: string;
  placeholder?: string;
  validation: {
    required?: boolean;
    pattern?: string;
    errorMessage?: string;
  };
};

export type ImageOption = {
  label: string;
  imageUrl?: string;
};

export type QuestionItem = {
  id: string;
  type:
    | "text"
    | "number"
    | "select"
    | "checkbox"
    | "radio"
    | "button"
    | "file"
    | "image-choice";
  title: string;
  placeholder?: string;
  hint?: string;
  imageUrl?: string;
  options?: Array<string | ImageOption>;
  multiple?: boolean;
  fields?: FieldItem[];
  validation?: {
    required?: boolean;
    minSelected?: number;
    maxSelected?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    errorMessage?: string;
  };
  completed?: boolean;
};

interface FirstQuizState {
  questions: QuestionItem[];
  setQuestions: (questions: QuestionItem[]) => void;
  addQuestion: (question: QuestionItem) => void;
  updateQuestion: (id: string, question: QuestionItem) => void;
  removeQuestion: (id: string) => void;
  reorderQuestions: (oldIndex: number, newIndex: number) => void;
}

export const useFirstQuizStore = create<FirstQuizState>()(
  persist(
    (set, get) => ({
      questions: firstQuizJSON as QuestionItem[],
      setQuestions: (questions) => set({ questions }),
      addQuestion: (question) => set({ questions: [...get().questions, question] }),
      updateQuestion: (id, question) =>
        set({
          questions: get().questions.map((q) => (q.id === id ? question : q)),
        }),
      removeQuestion: (id) =>
        set({ questions: get().questions.filter((q) => q.id !== id) }),
      reorderQuestions: (oldIndex, newIndex) => {
        const questions = [...get().questions];
        const [movedItem] = questions.splice(oldIndex, 1);
        questions.splice(newIndex, 0, movedItem);
        set({ questions });
      },
    }),
    { name: "first-quiz-store" }
  )
);
