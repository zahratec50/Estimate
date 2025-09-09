// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import rawQuestions from "@/data/mainQuizData.json"; // فایل JSON سوالات

// export type QuestionType =
//   | "text"
//   | "number"
//   | "select"
//   | "checkbox"
//   | "radio"
//   | "button"
//   | "image-choice"
//   | "file";

// export interface Question {
//   id: string; // رشته
//   type: QuestionType;
//   title: string;
//   placeholder?: string;
//   options?: string[];
//   multiple?: boolean;
//   hint?: string;
//   validation?: {
//     required: boolean;
//     minLength?: number;
//     min?: number;
//     max?: number;
//     minSelected?: number;
//     errorMessage?: string;
//   };
//   image?: string;
//   completed: boolean;

//   [key: string]: any;
// }

// export interface QuizStore {
//   questions: Question[];
//   currentStep: number;
//   setAnswer: (questionId: string, answer: string | string[] | File | null | { value: number; unit: string }) => void;
//   nextStep: () => void;
//   prevStep: () => void;
//   resetQuiz: () => void;
// }

// // نگاشت type های JSON به QuestionType زاستند
// const mapType = (type: string): QuestionType => {
//   switch (type) {
//     case "text":
//       return "text";
//     case "number":
//       return "number";
//     case "select":
//       return "select";
//     case "single-choice":
//     case "radio":
//       return "radio";
//     case "multi-choice":
//     case "checkbox":
//       return "checkbox";
//     case "button":
//       return "button";
//     case "image-choice":
//       return "image-choice";
//     case "file":
//       return "file";
//     default:
//       return "text";
//   }
// };

// // نگاشت کامل سوالات JSON به ساختار Question
// const mappedQuestions: Question[] = rawQuestions.map((q: any) => ({
//   id: String(q.id),
//   type: mapType(q.type),
//   title: q.title,
//   placeholder: q.placeholder,
//   multiple: q.multiple,
//   hint: q.hint,
//   validation: q.validation,
//   image: q.imageUrl,
//   completed: false,
//   options: q.options ? q.options.map((o: any) => (typeof o === "string" ? o : o.label)) : undefined,
// }));

// export const useQuizStore = create<QuizStore>()(
//   persist(
//     (set, get) => ({
//       questions: mappedQuestions,
//       currentStep: 1,

//       setAnswer: (questionId, answer) => {
//         set((state) => ({
//           questions: state.questions.map((q) =>
//             q.id === questionId
//               ? {
//                   ...q,
//                   completed: true,
//                   // برای سوالات چند گزینه‌ای، پاسخ را ذخیره کن
//                   options: q.options && Array.isArray(answer) ? answer : q.options,
//                   // برای فایل یا تک پاسخ، می‌توان answer را به یک فیلد جدید ذخیره کرد
//                   answer: answer,
//                 }
//               : q
//           ),
//         }));
//       },

//       nextStep: () => {
//         set((state) => ({
//           currentStep:
//             state.currentStep < state.questions.length
//               ? state.currentStep + 1
//               : state.currentStep,
//         }));
//       },

//       prevStep: () => {
//         set((state) => ({
//           currentStep: state.currentStep > 1 ? state.currentStep - 1 : 1,
//         }));
//       },

//       resetQuiz: () => {
//         set({
//           questions: mappedQuestions,
//           currentStep: 1,
//         });
//       },
//     }),
//     { name: "quiz-store" }
//   )
// );


// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import rawQuestions from "@/data/mainQuizData.json";

// export type QuestionType =
//   | "text" | "number" | "select" | "checkbox" | "radio" | "button" | "file";

// export interface Question {
//   id: string;
//   type: QuestionType;
//   title: string;
//   placeholder?: string;
//   options?: string[];
//   multiple?: boolean;
//   hint?: string;
//   validation?: {
//     required: boolean;
//     minLength?: number;
//     min?: number;
//     max?: number;
//     minSelected?: number;
//     errorMessage?: string;
//   };
//   image?: string;
//   answer?: any;
//   completed: boolean;
// }

// export interface QuizStore {
//   questions: Question[];
//   currentStep: number;
//   setAnswer: (questionId: string, answer: any) => void;
//   nextStep: () => void;
//   prevStep: () => void;
//   resetQuiz: () => void;
// }

// const mapType = (type: string): QuestionType => {
//   switch (type) {
//     case "text": return "text";
//     case "number": return "number";
//     case "select": return "select";
//     case "checkbox": return "checkbox";
//     case "radio": return "radio";
//     case "button": return "button";
//     case "file": return "file";
//     default: return "text";
//   }
// };

// const mappedQuestions: Question[] = rawQuestions.map((q: any) => ({
//   id: String(q.id),
//   type: mapType(q.type),
//   title: q.title,
//   placeholder: q.placeholder,
//   multiple: q.multiple,
//   hint: q.hint,
//   validation: q.validation,
//   image: q.imageUrl,
//   completed: false,
//   options: q.options?.map((o: any) => (typeof o === "string" ? o : o.label)),
// }));

// export const useQuizStore = create<QuizStore>()(
//   persist(
//     (set) => ({
//       questions: mappedQuestions,
//       currentStep: 1,
//       setAnswer: (questionId, answer) => {
//         set((state) => ({
//           questions: state.questions.map((q) =>
//             q.id === questionId ? { ...q, answer, completed: true } : q
//           ),
//         }));
//       },
//       nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, state.questions.length) })),
//       prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
//       resetQuiz: () => set({ questions: mappedQuestions, currentStep: 1 }),
//     }),
//     { name: "quiz-store" }
//   )
// );


// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import rawQuestions from "@/data/mainQuizData.json";

// export type QuestionType =
//   | "text"
//   | "number"
//   | "select"
//   | "checkbox"
//   | "radio"
//   | "button"
//   | "file";

// export interface Question {
//   id: string;
//   type: QuestionType;
//   title: string;
//   placeholder?: string;
//   options?: string[];
//   multiple?: boolean;
//   hint?: string;
//   validation?: {
//     required: boolean;
//     minLength?: number;
//     min?: number;
//     max?: number;
//     minSelected?: number;
//     errorMessage?: string;
//   };
//   image?: string;
//   completed: boolean;
//   answer?: string | string[] | File | { value: number; unit: string } | null;
// }

// export interface QuizStore {
//   questions: Question[];
//   currentStep: number;
//   setAnswer: (questionId: string, answer: Question["answer"]) => void;
//   nextStep: () => void;
//   prevStep: () => void;
//   resetQuiz: () => void;
// }

// const mapType = (type: string): QuestionType => {
//   switch (type) {
//     case "text": return "text";
//     case "number": return "number";
//     case "select": return "select";
//     case "checkbox": return "checkbox";
//     case "radio": return "radio";
//     case "button": return "button";
//     case "file": return "file";
//     default: return "text";
//   }
// };

// const mappedQuestions: Question[] = rawQuestions.map((q: any) => ({
//   id: String(q.id),
//   type: mapType(q.type),
//   title: q.title,
//   placeholder: q.placeholder,
//   multiple: q.multiple,
//   hint: q.hint,
//   validation: q.validation,
//   image: q.imageUrl,
//   completed: false,
//   options: q.options ? q.options.map((o: any) => (typeof o === "string" ? o : o.label)) : undefined,
// }));

// export const useQuizStore = create<QuizStore>()(
//   persist((set) => ({
//     questions: mappedQuestions,
//     currentStep: 1,
//     setAnswer: (questionId, answer) =>
//       set((state) => ({
//         questions: state.questions.map((q) =>
//           q.id === questionId
//             ? { ...q, completed: true, answer }
//             : q
//         ),
//       })),
//     nextStep: () =>
//       set((state) => ({
//         currentStep: Math.min(state.currentStep + 1, state.questions.length),
//       })),
//     prevStep: () =>
//       set((state) => ({
//         currentStep: Math.max(state.currentStep - 1, 1),
//       })),
//     resetQuiz: () =>
//       set({ questions: mappedQuestions, currentStep: 1 }),
//   }), { name: "quiz-store" })
// );


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
