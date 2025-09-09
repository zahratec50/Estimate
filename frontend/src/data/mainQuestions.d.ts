// declare module "@/data/mainQuizData.json" {
//   interface Question {
//     id: number;
//     type: "single-choice" | "multi-choice" | "select" | "text-input";
//     title: string;
//     options: string[];
//     multiple?: boolean;
//     validation: {
//       required: boolean;
//       errorMessage: string;
//       minSelected?: number;
//       maxSelected?: number;
//       pattern?: string;
//     };
//     fields?: Array<{
//       label: string;
//       placeholder: string;
//       validation: { required: boolean; pattern: string; errorMessage: string };
//     }>;
//   }
//   const firstQuestion: Question[];
//   export default firstQuestion;
// }


declare module "@/data/mainQuizData.json" {
  export interface FieldItem {
    label: string;
    placeholder: string;
    validation: {
      required: boolean;
      pattern?: string;
      errorMessage?: string;
    };
  }

  export interface ImageOption {
    label: string;
    imageUrl?: string;
  }

  export interface QuestionItem {
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
  }

  const mainQuizData: QuestionItem[];
  export default mainQuizData;
}
