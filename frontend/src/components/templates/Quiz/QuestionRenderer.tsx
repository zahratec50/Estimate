// "use client";

// import React, { useMemo } from "react";
// import { useAppStore } from "@/store/useAppStore";
// import firstQuestion from "@/data/firstQuestion.json";
// import mainQuizData from "@/data/mainQuizData.json";

// import { TextInputQuestion } from "@/components/modules/QuizField/TextInputQuestion";
// import { NumberSliderQuestion } from "@/components/modules/QuizField/NumberSliderQuestion";
// import { SelectQuestion } from "@/components/modules/QuizField/Quiz/SelectQuestion";
// import { CheckboxQuestion } from "@/components/modules/QuizField/Quiz/CheckboxQuestion";
// import { RadioQuestion } from "@/components/modules/QuizField/Quiz/RadioQuestion";
// import { ButtonQuestion } from "@/components/modules/QuizField/Quiz/ButtonQuestion";
// import FileQuestion from "@/components/modules/QuizField/Quiz/FileQuestion";

// interface QuizRendererProps {
//   isFirstQuiz: boolean;
// }

// export const QuizRenderer = ({ isFirstQuiz }: QuizRendererProps) => {
//   const currentStep = useAppStore((s) =>
//     isFirstQuiz ? s.currentStepFirstQuiz : s.currentStepMainQuiz
//   );
//   const quiz = isFirstQuiz ? firstQuestion : mainQuizData;

//   const currentQuestion = useMemo(
//     () => quiz[currentStep - 1],
//     [quiz, currentStep]
//   );

//   if (!currentQuestion) return null;

//   const renderQuestion = () => {
//     switch (currentQuestion.type) {
//       case "text":
//         return <TextInputQuestion questionId={currentQuestion.id} />;
//       case "number":
//         return (
//           <NumberSliderQuestion
//             min={0}
//             max={100}
//             questionId={currentQuestion.id}
//           />
//         );
//       case "select":
//         return (
//           <SelectQuestion
//             questionId={currentQuestion.id}
//             multiple={currentQuestion.multiple}
//           />
//         );
//       case "checkbox":
//         return <CheckboxQuestion questionId={currentQuestion.id} />;
//       case "radio":
//         return <RadioQuestion questionId={currentQuestion.id} />;
//       case "button":
//         return (
//           <ButtonQuestion
//             questionId={currentQuestion.id}
//             multiple={currentQuestion.multiple}
//           />
//         );
//       case "file":
//         return <FileQuestion questionId={currentQuestion.id} />;
//       default:
//         return <div>Question type not supported.</div>;
//     }
//   };

//   return <div className="w-full">{renderQuestion()}</div>;
// };

"use client";

import React, { useMemo } from "react";
import { useQuizQuestions } from "@/hooks/useQuizQuestions"; // یادت باشه این useQuery اصلاح شده باشه
import { useAppStore } from "@/store/useAppStore";

import { TextInputQuestion } from "@/components/modules/QuizField/TextInputQuestion";
import { NumberSliderQuestion } from "@/components/modules/QuizField/NumberSliderQuestion";
import { SelectQuestion } from "@/components/modules/QuizField/Quiz/SelectQuestion";
import { CheckboxQuestion } from "@/components/modules/QuizField/CheckboxQuestion";
import { RadioQuestion } from "@/components/modules/QuizField/RadioQuestion";
import { ButtonQuestion } from "@/components/modules/QuizField/Quiz/ButtonQuestion";
import FileQuestion from "@/components/modules/QuizField/FileQuestion";

interface QuizRendererProps {
  isFirstQuiz: boolean;
}

export const QuizRenderer = ({ isFirstQuiz }: QuizRendererProps) => {
  const currentStep = useAppStore((s) =>
    isFirstQuiz ? s.currentStepFirstQuiz : s.currentStepMainQuiz
  );

  // ✅ داده از API / react-query
  const { data: quiz, isLoading, isError } = useQuizQuestions();

  const currentQuestion = useMemo(() => {
    if (!quiz) return null;
    return quiz[currentStep - 1];
  }, [quiz, currentStep]);

  if (isLoading) return <p>Loading questions...</p>;
  if (isError) return <p>Error loading questions. Please try again.</p>;
  if (!currentQuestion) return <p>No question found.</p>;

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "text":
        return <TextInputQuestion questionId={currentQuestion.id} />;
      case "number":
        return (
          <NumberSliderQuestion
            min={0}
            max={100}
            questionId={currentQuestion.id}
          />
        );
      case "select":
        return (
          <SelectQuestion
            questionId={currentQuestion.id}
            multiple={currentQuestion.multiple}
          />
        );
      case "checkbox":
        return <CheckboxQuestion questionId={currentQuestion.id} />;
      case "radio":
        return <RadioQuestion questionId={currentQuestion.id} />;
      case "button":
        return (
          <ButtonQuestion
            questionId={currentQuestion.id}
            multiple={currentQuestion.multiple}
          />
        );
      case "file":
        return <FileQuestion questionId={currentQuestion.id} />;
      default:
        return <div>Question type not supported.</div>;
    }
  };

  return <div className="w-full">{renderQuestion()}</div>;
};
