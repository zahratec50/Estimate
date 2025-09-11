import { create } from "zustand";
import { persist } from "zustand/middleware";
import rawQuestions from "@/data/mainQuizData.json";

export type QuestionType =
  | "text"
  | "number"
  | "select"
  | "checkbox"
  | "radio"
  | "button"
  | "file";

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  placeholder?: string;
  options?: string[];
  multiple?: boolean;
  hint?: string;
  validation?: {
    required: boolean;
    minLength?: number;
    min?: number;
    max?: number;
    minSelected?: number;
    errorMessage?: string;
  };
  image?: string;
  completed: boolean;
  answer?: string | string[] | { value: number; unit: string } | File | null;
  [key: string]: any;
}

export interface QuizStore {
  questions: Question[];
  currentStep: number;
  setAnswer: (questionId: string, answer: string | string[] | { value: number; unit: string } | File | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetQuiz: () => void;
}

const mapType = (type: string): QuestionType => {
  switch (type) {
    case "text": return "text";
    case "number": return "number";
    case "select": return "select";
    case "radio":
    case "single-choice": return "radio";
    case "checkbox":
    case "multi-choice": return "checkbox";
    case "button": return "button";
    case "file": return "file";
    default: return "text";
  }
};

const mappedQuestions: Question[] = rawQuestions.map((q: any) => ({
  id: String(q.id),
  type: mapType(q.type),
  title: q.title,
  placeholder: q.placeholder,
  multiple: q.multiple,
  hint: q.hint,
  validation: q.validation,
  image: q.imageUrl,
  completed: false,
  options: q.options ? q.options.map((o: any) => typeof o === "string" ? o : o.label) : undefined,
}));

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      questions: mappedQuestions,
      currentStep: 1,
      setAnswer: (questionId, answer) => {
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === questionId
              ? { ...q, completed: true, answer }
              : q
          ),
        }));
      },
      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, state.questions.length) })),
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
      resetQuiz: () => set({ questions: mappedQuestions, currentStep: 1 }),
    }),
    { name: "quiz-store" }
  )
);
