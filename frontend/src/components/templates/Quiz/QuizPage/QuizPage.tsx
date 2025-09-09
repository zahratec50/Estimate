// "use client";

// import { useAppStore, QuestionItem } from "@/store/useAppStore";
// import { useMemo, useEffect, useState, useCallback } from "react";
// import firstQuestion from "@/data/firstQuestion.json";
// import mainQuizData from "@/data/mainQuizData.json";

// import SingleChoiceQuestion from "@/components/modules/QuizField/SingleChoiceQuestion";
// import MultiChoiceQuestion from "@/components/modules/QuizField/MultiChoiceQuestion";
// import SelectQuestion from "@/components/modules/QuizField/SelectQuestion";
// import { TextInputQuestion } from "@/components/modules/QuizField/TextInputQuestion";
// import ImageQuestion from "@/components/modules/QuizField/ImageQuestion";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { NumberSliderQuestion } from "@/components/modules/QuizField/NumberSliderQuestion";
// import { ImInfo } from "react-icons/im";
// import { RadioQuestion } from "@/components/modules/QuizField/Quiz/RadioQuestion";
// import { CheckboxQuestion } from "@/components/modules/QuizField/Quiz/CheckboxQuestion";
// import { FileQuestion } from "@/components/modules/QuizField/Quiz/FileQuestion";

// type QuestionProps = {
//   isHelpOpen: boolean;
//   isFirstQuiz: boolean;
// };

// export default function QuizPage({ isHelpOpen, isFirstQuiz }: QuestionProps) {
//   // ✅ Selectors جدا برای حداقل ری‌رندر
//   const currentStepFirstQuiz = useAppStore((s) => s.currentStepFirstQuiz);
//   const currentStepMainQuiz = useAppStore((s) => s.currentStepMainQuiz);
//   const projects = useAppStore((s) => s.projects);
//   const currentProjectId = useAppStore((s) => s.currentProjectId);
//   const preQuizAnswers = useAppStore((s) => s.preQuizAnswers);
//   const mainQuizAnswersTemp = useAppStore((s) => s.mainQuizAnswersTemp);

//   const setAnswer = useAppStore((s) => s.setAnswer);

//   const currentStep = isFirstQuiz ? currentStepFirstQuiz : currentStepMainQuiz;
//   const quiz = isFirstQuiz ? firstQuestion : mainQuizData;

//   // ✅ تعیین سوال جاری با useMemo
//   const questionData: QuestionItem | null = useMemo(() => {
//     return currentStep >= 1 && currentStep <= quiz.length
//       ? quiz[currentStep - 1]
//       : null;
//   }, [currentStep, quiz]);

//   // ✅ پاسخ جاری با useMemo
//   const selectedAnswer = useAppStore(
//     useCallback(
//       (state) => {
//         if (!questionData?.title) return null;

//         if (!isFirstQuiz && currentProjectId) {
//           const project = state.projects.find((p) => p.id === currentProjectId);
//           return (
//             project?.mainQuizAnswers.find(
//               (a) => a.questionTitle === questionData.title
//             )?.answer ?? null
//           );
//         }

//         return (
//           state.preQuizAnswers.find(
//             (a) => a.questionTitle === questionData.title
//           )?.answer ?? null
//         );
//       },
//       [questionData?.title, isFirstQuiz, currentProjectId]
//     )
//   );

//   // ✅ ذخیره پاسخ
//   const saveAnswerHandler = useCallback(
//     (answer: string | string[]) => {
//       if (!questionData) return;
//       setAnswer(questionData, answer, isFirstQuiz);
//     },
//     [questionData, isFirstQuiz, setAnswer]
//   );

//   // ✅ inputValue فقط برای text-input
//   const [inputValue, setInputValue] = useState<string | string[]>("");

//   useEffect(() => {
//     if (questionData?.type === "text") {
//       if (typeof selectedAnswer === "string") {
//         setInputValue(selectedAnswer);
//       } else if (Array.isArray(selectedAnswer)) {
//         setInputValue(selectedAnswer.join(""));
//       } else {
//         setInputValue(""); // fallback
//       }
//     }
//   }, [selectedAnswer, questionData]);

//   const handleInputChange = useCallback(
//     (answer: string | string[]) => {
//       const val = Array.isArray(answer) ? answer.join("") : answer;
//       setInputValue(val);

//       if (questionData?.type === "text" && val.trim().length >= 1) {
//         saveAnswerHandler(val);
//       }
//     },
//     [questionData?.type, saveAnswerHandler]
//   );

//   if (!questionData) {
//     return (
//       <div className="w-full text-center mt-10 text-red-500 dark:text-red-300 text-lg">
//         Question not found. Please check the URL or step number.
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`w-full ${
//         isHelpOpen ? "max-w-[800px]" : "max-w-full"
//       } font-roboto px-4 sm:px-0`}
//     >
//       <div className="flex items-start justify-start gap-3">
//         <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-blackNew-50 mb-10 dark:text-white">
//           {questionData.title}
//         </h1>
//         <Tooltip>
//           <TooltipTrigger>
//             <ImInfo className="size-5 sm:size-6 lg:size-8 mt-2" />
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>{questionData.hint}</p>
//           </TooltipContent>
//         </Tooltip>
//       </div>

//       {!questionData.multiple &&
//         questionData.options &&
//         questionData.options.length > 0 &&
//         questionData.type === "button" && (
//           <SingleChoiceQuestion
//             questionData={
//               questionData as Extract<QuestionItem, { type: "single-choice" }>
//             }
//             selectedAnswer={selectedAnswer as string}
//             setAnswer={saveAnswerHandler}
//             error=""
//           />
//         )}

//       {questionData.multiple && questionData.type === "button" && (
//         <MultiChoiceQuestion
//           questionData={
//             questionData as Extract<QuestionItem, { type: "multi-choice" }>
//           }
//           selectedAnswer={selectedAnswer as string[]}
//           setAnswer={saveAnswerHandler}
//         />
//       )}

//       {questionData.type === "number" && (
//         <NumberSliderQuestion
//           question={questionData}
//           selectedAnswer={selectedAnswer as string}
//           setAnswer={saveAnswerHandler}
//         />
//       )}

//       {questionData.type === "select" &&
//         questionData.options &&
//         questionData.options.length > 0 && (
//           <SelectQuestion
//             questionData={
//               questionData as Extract<QuestionItem, { type: "select" }>
//             }
//             selectedAnswer={selectedAnswer as string | string[]}
//             setAnswer={saveAnswerHandler}
//             isFirstQuiz={isFirstQuiz}
//           />
//         )}

//       {questionData.type === "text" && (
//         <TextInputQuestion
//           questionData={questionData as Extract<QuestionItem, { type: "text" }>}
//           selectedAnswer={inputValue as string | string[]}
//           setAnswer={(answer: any) => saveAnswerHandler(answer)}
//         />
//       )}

//       {questionData.type === "radio" && (
//         <RadioQuestion
//           question={questionData as Extract<QuestionItem, { type: "radio" }>}
//           selectedAnswer={inputValue as string}
//           setAnswer={handleInputChange}
//         />
//       )}
//       {questionData.type === "checkbox" && (
//         <CheckboxQuestion
//           question={questionData}
//           selectedAnswer={selectedAnswer as string[]}
//           setAnswer={(answer) => saveAnswerHandler(answer)}
//         />
//       )}
//       {questionData.type === "file" && (
//         <FileQuestion
//           question={questionData as Extract<QuestionItem, { type: "file" }>}
//           selectedAnswer={inputValue as string}
//           setAnswer={handleInputChange}
//         />
//       )}
//     </div>
//   );
// }

// "use client";

// import { useAppStore, QuestionItem } from "@/store/useAppStore";
// import { useMemo, useEffect, useState, useCallback } from "react";
// import firstQuestion from "@/data/firstQuestion.json";
// import mainQuizData from "@/data/mainQuizData.json";

// import SingleChoiceQuestion from "@/components/modules/QuizField/SingleChoiceQuestion";
// import MultiChoiceQuestion from "@/components/modules/QuizField/MultiChoiceQuestion";
// import SelectQuestion from "@/components/modules/QuizField/SelectQuestion";
// import { TextInputQuestion } from "@/components/modules/QuizField/TextInputQuestion";
// import ImageQuestion from "@/components/modules/QuizField/ImageQuestion";
// import { NumberSliderQuestion } from "@/components/modules/QuizField/NumberSliderQuestion";
// import { RadioQuestion } from "@/components/modules/QuizField/Quiz/RadioQuestion";
// import { CheckboxQuestion } from "@/components/modules/QuizField/Quiz/CheckboxQuestion";
// import { FileQuestion } from "@/components/modules/QuizField/Quiz/FileQuestion";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { ImInfo } from "react-icons/im";

// type QuestionProps = {
//   isHelpOpen: boolean;
//   isFirstQuiz: boolean;
// };

// export default function QuizPage({ isHelpOpen, isFirstQuiz }: QuestionProps) {
//   // =================== Store selectors ===================
//   const currentStepFirstQuiz = useAppStore((s) => s.currentStepFirstQuiz);
//   const currentStepMainQuiz = useAppStore((s) => s.currentStepMainQuiz);
//   const projects = useAppStore((s) => s.projects);
//   const currentProjectId = useAppStore((s) => s.currentProjectId);
//   const preQuizAnswers = useAppStore((s) => s.preQuizAnswers);
//   const mainQuizAnswersTemp = useAppStore((s) => s.mainQuizAnswersTemp);
//   const setAnswer = useAppStore((s) => s.setAnswer);

//   const currentStep = isFirstQuiz ? currentStepFirstQuiz : currentStepMainQuiz;
//   const quiz = isFirstQuiz ? firstQuestion : mainQuizData;

//   // =================== Current Question ===================
//   const questionData: QuestionItem | null = useMemo(() => {
//     return currentStep >= 1 && currentStep <= quiz.length
//       ? quiz[currentStep - 1]
//       : null;
//   }, [currentStep, quiz]);

//   // =================== Selected Answer ===================
//   const selectedAnswer = useAppStore(
//     useCallback(
//       (state) => {
//         if (!questionData?.title) return null;

//         if (!isFirstQuiz && currentProjectId) {
//           const project = state.projects.find((p) => p.id === currentProjectId);
//           return (
//             project?.mainQuizAnswers.find(
//               (a) => a.questionTitle === questionData.title
//             )?.answer ?? null
//           );
//         }

//         return (
//           state.preQuizAnswers.find(
//             (a) => a.questionTitle === questionData.title
//           )?.answer ?? null
//         );
//       },
//       [questionData?.title, isFirstQuiz, currentProjectId]
//     )
//   );

//   // =================== Save Answer Handler ===================
//   const saveAnswerHandler = useCallback(
//     (answer: string | string[]) => {
//       if (!questionData) return;
//       setAnswer(questionData, answer, isFirstQuiz);
//     },
//     [questionData, isFirstQuiz, setAnswer]
//   );

//   // =================== Text Input State ===================
//   const [inputValue, setInputValue] = useState<string | string[]>("");

//   useEffect(() => {
//     if (!questionData) return;

//     if (questionData.type === "text") {
//       if (typeof selectedAnswer === "string") {
//         setInputValue(selectedAnswer);
//       } else if (Array.isArray(selectedAnswer)) {
//         setInputValue(selectedAnswer);
//       } else {
//         setInputValue("");
//       }
//     } else if (questionData.type === "checkbox") {
//       if (Array.isArray(selectedAnswer)) setInputValue(selectedAnswer);
//       else setInputValue([]);
//     } else {
//       if (typeof selectedAnswer === "string" || Array.isArray(selectedAnswer)) {
//         setInputValue(selectedAnswer);
//       } else {
//         setInputValue("");
//       }
//     }
//   }, [selectedAnswer, questionData]);

//   const handleInputChange = useCallback(
//     (answer: string | string[]) => {
//       setInputValue(answer);
//       saveAnswerHandler(answer);
//     },
//     [saveAnswerHandler]
//   );

//   if (!questionData) {
//     return (
//       <div className="w-full text-center mt-10 text-red-500 dark:text-red-300 text-lg">
//         Question not found. Please check the URL or step number.
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`w-full ${
//         isHelpOpen ? "max-w-[800px]" : "max-w-full"
//       } font-roboto px-4 sm:px-0`}
//     >
//       <div className="flex items-start justify-start gap-3">
//         <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-blackNew-50 mb-10 dark:text-white">
//           {questionData.title}
//         </h1>
//         {questionData.hint && (
//           <Tooltip>
//             <TooltipTrigger>
//               <ImInfo className="size-5 sm:size-6 lg:size-8 mt-2" />
//             </TooltipTrigger>
//             <TooltipContent>
//               <p>{questionData.hint}</p>
//             </TooltipContent>
//           </Tooltip>
//         )}
//       </div>

//       {/* =================== Question Type Render =================== */}
//       {questionData.type === "button" && !questionData.multiple && (
//         <SingleChoiceQuestion
//           questionData={questionData}
//           selectedAnswer={selectedAnswer as string}
//           setAnswer={saveAnswerHandler}
//           error=""
//         />
//       )}

//       {questionData.type === "button" && questionData.multiple && (
//         <MultiChoiceQuestion
//           questionData={questionData}
//           selectedAnswer={selectedAnswer as string[]}
//           setAnswer={saveAnswerHandler}
//         />
//       )}

//       {questionData.type === "checkbox" && questionData.options && (
//         <CheckboxQuestion
//           question={questionData}
//           selectedAnswer={selectedAnswer as string[]}
//           setAnswer={handleInputChange}
//         />
//       )}

//       {questionData.type === "text" && (
//         <TextInputQuestion
//           questionData={questionData}
//           selectedAnswer={inputValue as string | string[]}
//           setAnswer={handleInputChange}
//         />
//       )}

//       {questionData.type === "radio" && questionData.options && (
//         <RadioQuestion
//           question={questionData}
//           selectedAnswer={inputValue as string}
//           setAnswer={handleInputChange}
//         />
//       )}

//       {questionData.type === "number" && (
//         <NumberSliderQuestion
//           question={questionData}
//           isFirstQuiz={isFirstQuiz}
//           selectedAnswer={selectedAnswer as string}
//           setAnswer={setAnswer} // Store-compatible
//         />
//       )}

//       {questionData.type === "select" && questionData.options && (
//         <SelectQuestion
//           questionData={questionData}
//           selectedAnswer={selectedAnswer as string | string[]}
//           setAnswer={saveAnswerHandler}
//           isFirstQuiz={isFirstQuiz}
//         />
//       )}

//       {questionData.type === "file" && (
//         <FileQuestion
//           question={questionData}
//           selectedAnswer={selectedAnswer as string}
//           setAnswer={handleInputChange}
//         />
//       )}

//       {/* {questionData.type === "image" && (
//         <ImageQuestion
//           question={questionData}
//           selectedAnswer={selectedAnswer as string}
//           setAnswer={handleInputChange}
//         />
//       )} */}
//     </div>
//   );
// }

"use client";

import { useAppStore, QuestionItem } from "@/store/useAppStore";
import { useMemo, useEffect, useState, useCallback } from "react";
import firstQuestion from "@/data/firstQuestion.json";
import mainQuizData from "@/data/mainQuizData.json";

import ChoiceQuestion from "@/components/modules/QuizField/ChoiceQuestion";
import { TextInputQuestion } from "@/components/modules/QuizField/TextInputQuestion";
import { NumberSliderQuestion } from "@/components/modules/QuizField/NumberSliderQuestion";
import SelectQuestion from "@/components/modules/QuizField/SelectQuestion";
import { FileQuestion } from "@/components/modules/QuizField/FileQuestion";
import { CheckboxQuestion } from "@/components/modules/QuizField/CheckboxQuestion";
import { RadioQuestion } from "@/components/modules/QuizField/RadioQuestion";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ImInfo } from "react-icons/im";

type QuestionProps = {
  isHelpOpen: boolean;
  isFirstQuiz: boolean;
};

type QuestionData = {
  id: string;
  title?: string;
  type: "text"; // فقط text
  fields?: Field[]; // اگر چند فیلد داره
  validation?: {
    required?: boolean;
    minLength?: number;
    pattern?: string;
    errorMessage?: string;
  };
};

type Field = {
  label: string;
  placeholder?: string;
  validation?: {
    required?: boolean;
    minLength?: number;
    pattern?: string;
    format?: "email" | "usPhone";
    errorMessage?: string;
  };
};

export default function QuizPage({ isHelpOpen, isFirstQuiz }: QuestionProps) {
  // =================== Store selectors ===================
  const currentStepFirstQuiz = useAppStore((s) => s.currentStepFirstQuiz);
  const currentStepMainQuiz = useAppStore((s) => s.currentStepMainQuiz);
  const currentProjectId = useAppStore((s) => s.currentProjectId);
  const setAnswer = useAppStore((s) => s.setAnswer);

  const currentStep = isFirstQuiz ? currentStepFirstQuiz : currentStepMainQuiz;
  const quiz = isFirstQuiz ? firstQuestion : mainQuizData;

  // =================== Current Question ===================
  const questionData: QuestionItem | null = useMemo(() => {
    return currentStep >= 1 && currentStep <= quiz.length
      ? quiz[currentStep - 1]
      : null;
  }, [currentStep, quiz]);

  // =================== Selected Answer ===================
  const selectedAnswer = useAppStore(
    useCallback(
      (state) => {
        if (!questionData?.title) return null;

        if (!isFirstQuiz && currentProjectId) {
          const project = state.projects.find((p) => p.id === currentProjectId);
          return (
            project?.mainQuizAnswers.find(
              (a) => a.questionTitle === questionData.title
            )?.answer ?? null
          );
        }

        return (
          state.preQuizAnswers.find(
            (a) => a.questionTitle === questionData.title
          )?.answer ?? null
        );
      },
      [questionData?.title, isFirstQuiz, currentProjectId]
    )
  );

  // =================== Save Answer Handler ===================
  const saveAnswerHandler = useCallback(
    (answer: string | string[]) => {
      if (!questionData) return;
      setAnswer(questionData, answer, isFirstQuiz);
    },
    [questionData, isFirstQuiz, setAnswer]
  );

  // =================== Text Input State ===================
  const [inputValue, setInputValue] = useState<string | string[]>("");

  useEffect(() => {
    if (!questionData) return;

    if (questionData.type === "text") {
      if (typeof selectedAnswer === "string") setInputValue(selectedAnswer);
      else if (Array.isArray(selectedAnswer)) setInputValue(selectedAnswer);
      else if (typeof selectedAnswer === "object" && selectedAnswer !== null)
        setInputValue(Object.values(selectedAnswer));
      // تبدیل Record<string,string> به string[]
      else setInputValue("");
    } else if (questionData.type === "checkbox") {
      if (Array.isArray(selectedAnswer)) setInputValue(selectedAnswer);
      else if (typeof selectedAnswer === "object" && selectedAnswer !== null)
        setInputValue(Object.values(selectedAnswer));
      else setInputValue([]);
    } else {
      if (typeof selectedAnswer === "string" || Array.isArray(selectedAnswer))
        setInputValue(selectedAnswer);
      else if (typeof selectedAnswer === "object" && selectedAnswer !== null)
        setInputValue(Object.values(selectedAnswer));
      else setInputValue("");
    }
  }, [selectedAnswer, questionData]);

  const handleInputChange = useCallback(
    (answer: string | string[]) => {
      setInputValue(answer);
      saveAnswerHandler(answer);
    },
    [saveAnswerHandler]
  );

  if (!questionData) {
    return (
      <div className="w-full text-center mt-10 text-red-500 dark:text-red-300 text-lg">
        Question not found. Please check the URL or step number.
      </div>
    );
  }

  return (
    <div
      className={`w-full ${
        isHelpOpen ? "max-w-[800px]" : "max-w-full"
      } font-roboto px-4 sm:px-0`}
    >
      <div className="flex items-start justify-start gap-3">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-blackNew-50 mb-10 dark:text-white">
          {questionData.title}
        </h1>
        {questionData.hint && (
          <Tooltip>
            <TooltipTrigger>
              <ImInfo className="size-5 sm:size-6 lg:size-8 mt-2" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{questionData.hint}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* =================== Question Type Render =================== */}
      {questionData.type === "button" && questionData.options && (
        <ChoiceQuestion
          questionData={questionData}
          answer={selectedAnswer as string | string[]}
          setAnswer={saveAnswerHandler}
          multiple={questionData.multiple ?? false}
        />
      )}

      {questionData.type === "text" && (
        <TextInputQuestion
          questionData={questionData as unknown as QuestionData}
          selectedAnswer={inputValue as string | string[]}
          setAnswer={handleInputChange}
        />
      )}

      {questionData.type === "number" && (
        <NumberSliderQuestion
          question={questionData}
          isFirstQuiz={isFirstQuiz}
          selectedAnswer={selectedAnswer as string}
          setAnswer={setAnswer}
        />
      )}

      {questionData.type === "select" && questionData.options && (
        <SelectQuestion
          questionData={questionData}
          selectedAnswer={selectedAnswer as string | string[]}
          setAnswer={saveAnswerHandler}
          isFirstQuiz={isFirstQuiz}
        />
      )}

      {questionData.type === "checkbox" && questionData.options && (
        <CheckboxQuestion
          question={questionData}
          selectedAnswer={selectedAnswer as string[]}
          setAnswer={handleInputChange}
        />
      )}

      {questionData.type === "radio" && questionData.options && (
        <RadioQuestion
          question={questionData}
          selectedAnswer={inputValue as string}
          setAnswer={handleInputChange}
        />
      )}

      {questionData.type === "file" && (
        <FileQuestion
          question={questionData}
          selectedAnswer={selectedAnswer as string}
          setAnswer={handleInputChange}
        />
      )}
    </div>
  );
}
