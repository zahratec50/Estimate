declare module "@/data/firstQuestion.json" {
  interface Question {
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
  const firstQuestion: Question[];
  export default firstQuestion;
}