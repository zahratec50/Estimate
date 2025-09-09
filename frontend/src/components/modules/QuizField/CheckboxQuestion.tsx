// "use client";
// import { useState, useEffect } from "react";
// import { useQuizStore } from "@/store/mainQuizStore";

// interface Props {
//   questionId: string;
// }

// export const CheckboxQuestion = ({ questionId }: Props) => {
//   const question = useQuizStore((s) => s.questions.find((q) => q.id === questionId));
//   const setAnswer = useQuizStore((s) => s.setAnswer);

//   const [selected, setSelected] = useState<string[]>([]);

//   useEffect(() => {
//     if (question?.answer) {
//       setSelected(Array.isArray(question.answer) ? question.answer : [question.answer as string]);
//     }
//   }, [question?.answer]);

//   const toggleOption = (opt: string) => {
//     const newSelection = selected.includes(opt)
//       ? selected.filter((s) => s !== opt)
//       : [...selected, opt];
//     setSelected(newSelection);
//     setAnswer(questionId, newSelection);
//   };

//   if (!question) return null;

//   return (
//     <div className="flex flex-col mt-4 gap-2">
//       <label className="font-medium">{question.title}</label>
//       {question.options?.map((opt) => (
//         <label key={opt} className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={selected.includes(opt)}
//             onChange={() => toggleOption(opt)}
//             className="accent-primary-500"
//           />
//           <span>{opt}</span>
//         </label>
//       ))}
//       {question.hint && <p className="text-gray-500 text-sm mt-1">{question.hint}</p>}
//     </div>
//   );
// };

// 'use client';

// import { useState, useEffect } from 'react';
// import { useAppStore, QuestionItem, ImageOption } from '@/store/useAppStore';
// import { showErrorToast } from '@/components/modules/toasts/ErrorToast';

// interface Props {
//   question: QuestionItem;
//   selectedAnswer: string[] | null;
//   setAnswer: (answer: string[]) => void;
// }

// export const CheckboxQuestion = ({ question, selectedAnswer, setAnswer }: Props) => {
//   const { isContinueAllowed } = useAppStore();

//   const [selected, setSelected] = useState<string[]>(
//     Array.isArray(selectedAnswer) ? selectedAnswer : []
//   );

//   useEffect(() => {
//     setSelected(Array.isArray(selectedAnswer) ? selectedAnswer : []);
//   }, [selectedAnswer]);

//   const toggleOption = (opt: string) => {
//     const newSelection = selected.includes(opt)
//       ? selected.filter((s) => s !== opt)
//       : [...selected, opt];
//     setSelected(newSelection);
//     if (isContinueAllowed(question, false)) {
//       setAnswer(newSelection);
//     } else {
//       showErrorToast({
//         title: 'ورودی نامعتبر',
//         description: question.validation?.errorMessage || 'لطفاً گزینه‌های معتبر انتخاب کنید.',
//       });
//     }
//   };

//   return (
//     <div className="flex flex-col mt-4 gap-2">
//       <label className="font-medium">{question.title}</label>
//       {question.options?.map((opt) => {
//         const optValue = typeof opt === 'string' ? opt : opt.label;
//         return (
//           <label key={optValue} className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={selected.includes(optValue)}
//               onChange={() => toggleOption(optValue)}
//               className="accent-primary-500"
//             />
//             <span className='text-lg font-roboto font-medium'>{optValue}</span>
//           </label>
//         );
//       })}
//       {question.hint && <p className="text-gray-500 text-sm mt-1">{question.hint}</p>}
//     </div>
//   );
// };

// "use client";

// import { useState, useEffect, useCallback, useMemo } from "react";
// import { useAppStore, QuestionItem } from "@/store/useAppStore";
// import { showErrorToast } from "@/components/modules/toasts/ErrorToast";

// interface Props {
//   question: QuestionItem;
//   selectedAnswer: string[] | null;
//   setAnswer: (answer: string[]) => void;
// }

// export const CheckboxQuestion = ({
//   question,
//   selectedAnswer,
//   setAnswer,
// }: Props) => {
//   const { isContinueAllowed } = useAppStore();
//   const [selected, setSelected] = useState<string[]>(selectedAnswer || []);

//   useEffect(() => {
//     setSelected(selectedAnswer || []);
//   }, [selectedAnswer]);

//   const toggleOption = useCallback(
//     (opt: string) => {
//       const newSelection = selected.includes(opt)
//         ? selected.filter((s) => s !== opt)
//         : [...selected, opt];

//       setSelected(newSelection);

//       if (isContinueAllowed(question, false)) {
//         setAnswer(newSelection);
//       } else {
//         showErrorToast({
//           title: "ورودی نامعتبر",
//           description:
//             question.validation?.errorMessage ||
//             "لطفاً گزینه‌های معتبر انتخاب کنید.",
//         });
//       }
//     },
//     [selected, question, isContinueAllowed, setAnswer]
//   );

//   const options = useMemo(
//     () =>
//       question.options?.map((opt) => ({
//         value: typeof opt === "string" ? opt : opt.label,
//       })) || [],
//     [question.options]
//   );

//   return (
//     <div className="flex flex-col gap-3">
//       <div className="grid grid-cols-1">
//         {options.map((opt) => (
//           <label
//             key={opt.value}
//             className={`flex items-center gap-2 p-3 rounded-lg  transition-all cursor-pointer
              
//               `}
//           >
//             <input
//               id={opt.value}
//               type="checkbox"
//               checked={selected.includes(opt.value)}
//               onChange={() => toggleOption(opt.value)}
//               className="accent-primary-500 w-5 h-5 "
//             />
//             <span className="text-base font-roboto">{opt.value}</span>
//           </label>
//         ))}
//       </div>

//       {question.validation?.minSelected && (
//         <p className="text-sm text-gray-400">
//           Please select at least {question.validation.minSelected} option
//           {question.validation.minSelected > 1 ? "s" : ""}
//         </p>
//       )}
//       {question.hint && (
//         <p className="text-sm text-gray-500 mt-1">{question.hint}</p>
//       )}
//     </div>
//   );
// };

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { QuestionItem } from "@/store/useAppStore";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";

interface Props {
  question: QuestionItem;
  selectedAnswer: string[] | null;
  setAnswer: (answer: string[]) => void;
}

export const CheckboxQuestion = ({
  question,
  selectedAnswer,
  setAnswer,
}: Props) => {
  const [selected, setSelected] = useState<string[]>(selectedAnswer || []);

  useEffect(() => {
    setSelected(selectedAnswer || []);
  }, [selectedAnswer]);

  const toggleOption = useCallback(
    (opt: string) => {
      setSelected((prev) => {
        const newSelection = prev.includes(opt)
          ? prev.filter((s) => s !== opt)
          : [...prev, opt];

        // Update answer after new selection
        setAnswer(newSelection);

        // Show warning if below minSelected, but do not block unchecking
        if (
          question.validation?.minSelected &&
          newSelection.length < question.validation.minSelected
        ) {
          showErrorToast({
            title: "Invalid input",
            description:
              question.validation?.errorMessage ||
              `Please select at least ${question.validation.minSelected} option${
                question.validation.minSelected > 1 ? "s" : ""
              }.`,
          });
        }

        return newSelection;
      });
    },
    [question, setAnswer]
  );

  const options = useMemo(
    () =>
      question.options?.map((opt) => ({
        value: typeof opt === "string" ? opt : opt.label,
      })) || [],
    [question.options]
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 p-3 rounded-lg transition-all cursor-pointer"
          >
            <input
              id={opt.value}
              type="checkbox"
              checked={selected.includes(opt.value)}
              onChange={() => toggleOption(opt.value)}
              className="accent-primary-500 w-5 h-5"
            />
            <span className="text-base font-roboto">{opt.value}</span>
          </label>
        ))}
      </div>

      {question.validation?.minSelected && (
        <p className="text-sm text-gray-400">
          Please select at least {question.validation.minSelected} option
          {question.validation.minSelected > 1 ? "s" : ""}.
        </p>
      )}
      {question.hint && (
        <p className="text-sm text-gray-500 mt-1">{question.hint}</p>
      )}
    </div>
  );
};
