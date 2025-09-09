// "use client";
// import { useQuizStore } from "@/store/mainQuizStore";

// interface Props {
//   questionId: string;
// }

// export const RadioQuestion = ({ questionId }: Props) => {
//   const question = useQuizStore((s) => s.questions.find((q) => q.id === questionId));
//   const setAnswer = useQuizStore((s) => s.setAnswer);

//   if (!question) return null;

//   return (
//     <div className="flex flex-col mt-4 gap-2">
//       <label className="font-medium">{question.title}</label>
//       {question.options?.map((opt) => (
//         <label key={opt} className="flex items-center gap-2">
//           <input
//             type="radio"
//             name={questionId}
//             checked={question.answer === opt}
//             onChange={() => setAnswer(questionId, opt)}
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

// import { useAppStore, QuestionItem } from '@/store/useAppStore';
// import { showErrorToast } from '@/components/modules/toasts/ErrorToast';

// interface Props {
//   question: QuestionItem;
//   selectedAnswer: string | null;
//   setAnswer: (answer: string) => void;
// }

// export const RadioQuestion = ({ question, selectedAnswer, setAnswer }: Props) => {
//   const { isContinueAllowed } = useAppStore();

//   const handleChange = (opt: string) => {
//     if (isContinueAllowed(question, false)) {
//       setAnswer(opt);
//     } else {
//       showErrorToast({
//         title: 'ورودی نامعتبر',
//         description: question.validation?.errorMessage || 'لطفاً یک گزینه معتبر انتخاب کنید.',
//       });
//     }
//   };

//   return (
//     <div className="flex flex-col mb-3 gap-2">
//       {question.options?.map((opt) => {
//         const optValue = typeof opt === 'string' ? opt : opt.label;
//         return (
//           <label key={optValue} className="flex items-center gap-2">
//             <input
//               type="radio"
//               name={question.id}
//               checked={selectedAnswer === optValue}
//               onChange={() => handleChange(optValue)}
//               className="accent-indigo-500 size-5"
//             />
//             <span className='text-lg font-roboto font-medium'>{optValue}</span>
//           </label>
//         );
//       })}
//       {question.hint && <p className="text-gray-500 text-sm mt-1">{question.hint}</p>}
//     </div>
//   );
// };

// 'use client';

// import { useAppStore, QuestionItem } from '@/store/useAppStore';
// import { showErrorToast } from '@/components/modules/toasts/ErrorToast';
// import { useMemo, useCallback } from 'react';

// interface Props {
//   question: QuestionItem;
//   selectedAnswer: string | null;
//   setAnswer: (answer: string) => void;
// }

// export const RadioQuestion = ({ question, selectedAnswer, setAnswer }: Props) => {
//   const { isContinueAllowed } = useAppStore();

//   const options = useMemo(
//     () => question.options?.map(opt => (typeof opt === 'string' ? opt : opt.label)) || [],
//     [question.options]
//   );

//   const handleChange = useCallback(
//     (optValue: string) => {
//       if (isContinueAllowed(question, false)) {
//         setAnswer(optValue);
//       } else {
//         showErrorToast({
//           title: 'Invalid input',
//           description: question.validation?.errorMessage || 'Please select a valid option.',
//         });
//       }
//     },
//     [question, isContinueAllowed, setAnswer]
//   );

//   return (
//     <div className="flex flex-col mb-3 gap-2">
//       {options.map(optValue => (
//         <label key={optValue} className="flex items-center gap-2 cursor-pointer">
//           <input
//             type="radio"
//             name={question.id}
//             checked={selectedAnswer === optValue}
//             onChange={() => handleChange(optValue)}
//             className="accent-indigo-500 size-5 focus:ring-2 focus:ring-indigo-400"
//           />
//           <span className="text-lg font-roboto font-medium">{optValue}</span>
//         </label>
//       ))}
//       {question.hint && <p className="text-gray-500 text-sm mt-1">{question.hint}</p>}
//     </div>
//   );
// };


'use client';

import { QuestionItem } from '@/store/useAppStore';
import { useMemo, useCallback } from 'react';

interface Props {
  question: QuestionItem;
  selectedAnswer: string | null;
  setAnswer: (answer: string) => void;
}

export const RadioQuestion = ({ question, selectedAnswer, setAnswer }: Props) => {
  const options = useMemo(
    () => question.options?.map(opt => (typeof opt === 'string' ? opt : opt.label)) || [],
    [question.options]
  );

  const handleChange = useCallback(
    (optValue: string) => {
      setAnswer(optValue); // همیشه ثبت شود
    },
    [setAnswer]
  );

  return (
    <div className="flex flex-col mb-3 gap-2">
      {options.map(optValue => (
        <label key={optValue} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={question.id}
            checked={selectedAnswer === optValue}
            onChange={() => handleChange(optValue)}
            className="accent-indigo-500 size-5 "
          />
          <span className="text-lg font-roboto font-medium">{optValue}</span>
        </label>
      ))}
      {question.hint && <p className="text-gray-500 text-sm mt-1">{question.hint}</p>}
    </div>
  );
};
