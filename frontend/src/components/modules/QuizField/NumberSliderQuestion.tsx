
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useAppStore, QuestionItem } from "@/store/useAppStore";
// import { UnitSelector } from "../UnitSelector/UnitSelector";
// import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
// import { debounce } from "lodash";

// interface Props {
//   question: QuestionItem;
//   isFirstQuiz: boolean;
//   selectedAnswer: string | string[];
//   setAnswer: (question: QuestionItem, answer: string | string[], isFirstQuiz: boolean) => void;
// }

// export const NumberSliderQuestion = ({ question, isFirstQuiz, selectedAnswer, setAnswer }: Props) => {
//   const { getAnswerForQuestion } = useAppStore();

//   const min = question.validation?.min || 0;
//   const max = question.validation?.max || 100;
//   const step = question.validation?.step || 1;
//   const units = question.validation?.units || ["m", "ft", "in"];

//   const initialAnswer = getAnswerForQuestion(question.id, isFirstQuiz) as string | null;

//   const parseAnswer = (answer: string | null) => {
//     if (answer) {
//       const [value, unit] = answer.split(" ");
//       const parsedValue = parseFloat(value);
//       return {
//         value: isNaN(parsedValue) ? min : Math.max(min, Math.min(max, parsedValue)),
//         unit: unit || units[0],
//       };
//     }
//     return { value: min, unit: units[0] };
//   };

//   const { value: initialValue, unit: initialUnit } = parseAnswer(initialAnswer);
//   const [value, setValue] = useState<number>(initialValue);
//   const [unit, setUnit] = useState<string>(initialUnit);
//   const [inputValue, setInputValue] = useState<string>(`${initialValue}`);

//   const debouncedSaveRef = useRef(
//     debounce((val: number, u: string) => {
//       setAnswer(question, `${val} ${u}`, isFirstQuiz);
//     }, 200)
//   );

//   useEffect(() => {
//     const { value, unit } = parseAnswer(getAnswerForQuestion(question.id, isFirstQuiz) as string | null);
//     setValue(value);
//     setUnit(unit);
//     setInputValue(`${value}`);
//   }, [getAnswerForQuestion, question.id, isFirstQuiz]);

//   // آرایه ticks
//   const ticks = Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step);

//   const getPercent = (val: number) => {
//     const index = ticks.indexOf(val);
//     return (index / (ticks.length - 1)) * 100;
//   };

//   const handleSliderChange = (val: number) => {
//     setValue(val);
//     setInputValue(`${val}`);
//     debouncedSaveRef.current(val, unit);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };

//   const handleInputBlur = () => {
//     const parsed = parseFloat(inputValue);
//     if (!isNaN(parsed)) {
//       const val = Math.max(min, Math.min(max, parsed));
//       setValue(val);
//       setInputValue(`${val}`);
//       setAnswer(question, `${val} ${unit}`, isFirstQuiz);
//     } else {
//       showErrorToast({
//         title: "مقدار نامعتبر",
//         description: "لطفاً یک عدد معتبر وارد کنید.",
//       });
//       setInputValue(`${value}`);
//     }
//   };

//   const handleUnitChange = (newUnit: string) => {
//     setUnit(newUnit);
//     setAnswer(question, `${value} ${newUnit}`, isFirstQuiz);
//   };

//   return (
//     <div className="flex flex-col gap-6 mt-6">
//       {/* خط‌کش + کولیس */}
//       <div className="relative w-full h-24">
//         {/* خط‌کش اصلی */}
//         <div className="absolute top-1/2 w-full h-0.5 bg-gray-700 dark:bg-gray-300 -translate-y-1/2 pointer-events-none" />

//         {/* ticks */}
//         <div className="absolute w-full flex justify-between top-1/2 -translate-y-1/2">
//           {ticks.map((num, i) => {
//             const isMajor = num % (step * 10) === 0;
//             return (
//               <div key={i} className="flex flex-col items-center relative">
//                 <div
//                   className={`${isMajor ? "h-6 w-0.5 bg-gray-800" : "h-3 w-px bg-gray-500"}`}
//                 />
//                 {isMajor && (
//                   <span className="absolute top-6 text-xs text-gray-700 dark:text-gray-300">
//                     {num}
//                   </span>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* input range نامرئی */}
//         <input
//           type="range"
//           aria-label="Measurement Caliper"
//           min={0}
//           max={ticks.length - 1}
//           step={1}
//           value={ticks.indexOf(value)}
//           onChange={(e) => handleSliderChange(ticks[Number(e.target.value)])}
//           className="absolute w-full h-24 opacity-0 z-10 cursor-grab"
//           style={{ WebkitAppearance: "none" }}
//         />

//         {/* بلاک کولیس (فک متحرک) */}
//         <div
//           className="absolute top-1/2 -translate-y-15 -translate-x-1/2 flex flex-col items-center transition-all"
//           style={{ left: `${getPercent(value)}%` }}
//         >
//           {/* مقدار */}
//           <div className="mb-2 bg-gray-800 text-white dark:bg-gray-100 dark:text-black text-sm px-3 py-1 rounded-md shadow">
//             {value} {unit}
//           </div>
//           {/* بلاک مستطیلی ضخیم */}
//           <div className="w-3 h-10 bg-indigo-600 border-2 border-indigo-900 dark:border-indigo-100 shadow-md rounded-full" />
//         </div>
//       </div>

//       {/* input و unit */}
//       <div className="flex gap-20 mt-4">
//         <div className="flex items-center gap-2">
//           <input
//             type="number"
//             aria-label="Measurement Number Input"
//             value={inputValue}
//             onChange={handleInputChange}
//             onBlur={handleInputBlur}
//             className="w-24 px-2 py-1 border rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-200"
//           />
//           <span>{unit}</span>
//         </div>
//         <UnitSelector units={units} selectedUnit={unit} setSelectedUnit={handleUnitChange} />
//       </div>
//     </div>
//   );
// };


"use client";

import { useState, useEffect, useRef } from "react";
import { QuestionItem } from "@/store/useAppStore";
import { UnitSelector } from "../UnitSelector/UnitSelector";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
import { debounce } from "lodash";

interface Props {
  question: QuestionItem;
  isFirstQuiz: boolean;
  selectedAnswer: string | string[];
  setAnswer: (question: QuestionItem, answer: string | string[], isFirstQuiz: boolean) => void;
}

export const NumberSliderQuestion = ({ question, isFirstQuiz, selectedAnswer, setAnswer }: Props) => {

  const min = question.validation?.min || 0;
  const max = question.validation?.max || 100;
  const step = question.validation?.step || 1;
  const units = question.validation?.units || ["m", "ft", "in"];

  const parseAnswer = (answer: string | null | undefined) => {
    if (answer) {
      const [value, unit] = answer.split(" ");
      const parsedValue = parseFloat(value);
      return {
        value: isNaN(parsedValue) ? min : Math.max(min, Math.min(max, parsedValue)),
        unit: unit || units[0],
      };
    }
    return { value: min, unit: units[0] };
  };

  const { value: initialValue, unit: initialUnit } = parseAnswer(selectedAnswer as string || null);
  const [value, setValue] = useState<number>(initialValue);
  const [unit, setUnit] = useState<string>(initialUnit);
  const [inputValue, setInputValue] = useState<string>(`${initialValue}`);

  const debouncedSaveRef = useRef(
    debounce((val: number, u: string) => {
      setAnswer(question, `${val} ${u}`, isFirstQuiz);
    }, 200)
  );

  useEffect(() => {
    const { value, unit } = parseAnswer(selectedAnswer as string || null);
    setValue(value);
    setUnit(unit);
    setInputValue(`${value}`);
  }, [selectedAnswer]);

  // آرایه ticks
  const ticks = Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step);

  const getPercent = (val: number) => {
    const index = ticks.indexOf(val);
    return (index / (ticks.length - 1)) * 100;
  };

  const handleSliderChange = (val: number) => {
    setValue(val);
    setInputValue(`${val}`);
    debouncedSaveRef.current(val, unit);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const parsed = parseFloat(inputValue);
    if (!isNaN(parsed)) {
      const val = Math.max(min, Math.min(max, parsed));
      setValue(val);
      setInputValue(`${val}`);
      setAnswer(question, `${val} ${unit}`, isFirstQuiz);
    } else {
      showErrorToast({
        title: "مقدار نامعتبر",
        description: "لطفاً یک عدد معتبر وارد کنید.",
      });
      setInputValue(`${value}`);
    }
  };

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
    setAnswer(question, `${value} ${newUnit}`, isFirstQuiz);
  };

  return (
    <div className="flex flex-col gap-6 mt-6">
      {/* خط‌کش + کولیس */}
      <div className="relative w-full h-24">
        {/* خط‌کش اصلی */}
        <div className="absolute top-1/2 w-full h-0.5 bg-gray-700 dark:bg-gray-300 -translate-y-1/2 pointer-events-none" />

        {/* ticks */}
        <div className="absolute w-full flex justify-between top-1/2 -translate-y-1/2">
          {ticks.map((num, i) => {
            const isMajor = num % (step * 10) === 0;
            return (
              <div key={i} className="flex flex-col items-center relative">
                <div
                  className={`${isMajor ? "h-6 w-0.5 bg-gray-800" : "h-3 w-px bg-gray-500"}`}
                />
                {isMajor && (
                  <span className="absolute top-6 text-xs text-gray-700 dark:text-gray-300">
                    {num}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* input range نامرئی */}
        <input
          type="range"
          aria-label="Measurement Caliper"
          min={0}
          max={ticks.length - 1}
          step={1}
          value={ticks.indexOf(value)}
          onChange={(e) => handleSliderChange(ticks[Number(e.target.value)])}
          className="absolute w-full h-24 opacity-0 z-10 cursor-grab"
          style={{ WebkitAppearance: "none" }}
        />

        {/* بلاک کولیس (فک متحرک) */}
        <div
          className="absolute top-1/2 -translate-y-15 -translate-x-1/2 flex flex-col items-center transition-all"
          style={{ left: `${getPercent(value)}%` }}
        >
          {/* مقدار */}
          <div className="mb-2 bg-gray-800 text-white dark:bg-gray-100 dark:text-black text-sm px-3 py-1 rounded-md shadow">
            {value} {unit}
          </div>
          {/* بلاک مستطیلی ضخیم */}
          <div className="w-3 h-10 bg-indigo-600 border-2 border-indigo-900 dark:border-indigo-100 shadow-md rounded-full" />
        </div>
      </div>

      {/* input و unit */}
      <div className="flex gap-20 mt-4">
        <div className="flex items-center gap-2">
          <input
            type="number"
            aria-label="Measurement Number Input"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="w-24 px-2 py-1 border rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-200"
          />
          <span>{unit}</span>
        </div>
        <UnitSelector units={units} selectedUnit={unit} setSelectedUnit={handleUnitChange} />
      </div>
    </div>
  );
};