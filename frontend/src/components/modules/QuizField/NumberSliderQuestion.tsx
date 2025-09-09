// "use client";

// import { useState, useEffect } from "react";
// import { useQuizStore } from "@/store/mainQuizStore";
// import UnitSelector from "../UnitSelector/UnitSelector";

// interface NumberSliderProps {
//   questionId: string;
//   min: number;
//   max: number;
//   step?: number;
//   units: string[];
// }

// export default function NumberSlider({
//   questionId,
//   min,
//   max,
//   step = 1,
//   units,
// }: NumberSliderProps) {
//   const answer = useQuizStore(
//     (state) =>
//       state.questions.find((q) => q.id === questionId)?.answer as
//         | { value: number; unit: string }
//         | undefined
//   );
//   const setAnswer = useQuizStore((state) => state.setAnswer);

//   const [value, setValue] = useState<number>(answer?.value ?? min);
//   const [unit, setUnit] = useState<string>(answer?.unit ?? units[0]);

//   useEffect(() => {
//     setValue(answer?.value ?? min);
//     setUnit(answer?.unit ?? units[0]);
//   }, [answer?.value, answer?.unit, min, units]);

//   const handleChange = (val: number) => {
//     setValue(val);
//     setAnswer(questionId, { value: val, unit });
//   };

//   const handleUnitChange = (selectedUnit: string) => {
//     setUnit(selectedUnit);
//     setAnswer(questionId, { value, unit: selectedUnit });
//   };

//   return (
//     <div className="flex flex-col gap-4 mt-4 p-4 border rounded-lg border-gray-300">
//       <input
//         type="range"
//         aria-label="range"
//         min={min}
//         max={max}
//         step={step}
//         value={value}
//         onChange={(e) => handleChange(Number(e.target.value))}
//         className="w-full accent-primary-500"
//       />
//       <div className="flex justify-between text-sm text-gray-600">
//         <span>{min}</span>
//         <span>{value} {unit}</span>
//         <span>{max}</span>
//       </div>

//       <UnitSelector units={units} selectedUnit={unit} setSelectedUnit={handleUnitChange} />
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import { useQuizStore } from "@/store/mainQuizStore";
// import {UnitSelector} from "../UnitSelector/UnitSelector";

// interface Props {
//   questionId: string;
//   min: number;
//   max: number;
//   step?: number;
//   units?: string[];
// }

// export const NumberSliderQuestion = ({ questionId, min, max, step = 1, units = ["m", "ft", "in"] }: Props) => {
//   const question = useQuizStore((s) => s.questions.find((q) => q.id === questionId));
//   const setAnswer = useQuizStore((s) => s.setAnswer);

//   const [value, setValue] = useState<number>((question?.answer as any)?.value || min);
//   const [unit, setUnit] = useState<string>((question?.answer as any)?.unit || units[0]);

//   useEffect(() => {
//     setValue((question?.answer as any)?.value || min);
//     setUnit((question?.answer as any)?.unit || units[0]);
//   }, [question?.answer, min, units]);

//   useEffect(() => {
//     setAnswer(questionId, { value, unit });
//   }, [value, unit, questionId, setAnswer]);

//   if (!question) return null;

//   return (
//     <div className="flex flex-col gap-2 mt-4">
//       <label className="font-medium">{question.title}</label>
//       <input
//         type="range"
//         aria-label="range"
//         min={min}
//         max={max}
//         step={step}
//         value={value}
//         onChange={(e) => setValue(Number(e.target.value))}
//         className="w-full accent-primary-500"
//       />
//       <div className="flex justify-between text-sm text-gray-600">
//         <span>{min}</span>
//         <span>{value} {unit}</span>
//         <span>{max}</span>
//       </div>
//       <UnitSelector units={units} selectedUnit={unit} setSelectedUnit={setUnit} />
//       {question.hint && <p className="text-gray-500 text-sm mt-1">{question.hint}</p>}
//     </div>
//   );
// };

// 'use client';

// import { useState, useEffect } from 'react';
// import { useAppStore, QuestionItem } from '@/store/useAppStore';
// import { UnitSelector } from '../UnitSelector/UnitSelector';
// import { showErrorToast } from '@/components/modules/toasts/ErrorToast';

// interface Props {
//   question: QuestionItem;
//   selectedAnswer: string | null;
//   setAnswer: (answer: string) => void;
// }

// export const NumberSliderQuestion = ({ question, selectedAnswer, setAnswer }: Props) => {
//   const { isContinueAllowed } = useAppStore();

//   const min = question.validation?.min || 0;
//   const max = question.validation?.max || 100;
//   const step = question.validation?.step || 1;
//   const units = question.validation?.units || ['m', 'ft', 'in'];

//   const parseAnswer = (answer: string | null) => {
//     if (answer) {
//       const [value, unit] = answer.split(' ');
//       return { value: parseFloat(value) || min, unit: unit || units[0] };
//     }
//     return { value: min, unit: units[0] };
//   };

//   const [value, setValue] = useState<number>(parseAnswer(selectedAnswer).value);
//   const [unit, setUnit] = useState<string>(parseAnswer(selectedAnswer).unit);

//   useEffect(() => {
//     const { value, unit } = parseAnswer(selectedAnswer);
//     setValue(value);
//     setUnit(unit);
//   }, [selectedAnswer, min, units]);

//   const handleChange = () => {
//     if (isContinueAllowed(question, false)) {
//       setAnswer(`${value} ${unit}`);
//     } else {
//       showErrorToast({
//         title: 'ورودی نامعتبر',
//         description: question.validation?.errorMessage || 'لطفاً یک مقدار معتبر انتخاب کنید.',
//       });
//     }
//   };

//   return (
//     <div className="flex flex-col gap-2 mt-4">
//       <label className="font-medium">{question.title}</label>
//       <input
//         type="range"
//         aria-label="range"
//         min={min}
//         max={max}
//         step={step}
//         value={value}
//         onChange={(e) => {
//           setValue(Number(e.target.value));
//           handleChange();
//         }}
//         className="w-full accent-primary-500"
//       />
//       <div className="flex justify-between text-sm text-gray-600">
//         <span>{min}</span>
//         <span>{value} {unit}</span>
//         <span>{max}</span>
//       </div>
//       <UnitSelector
//         units={units}
//         selectedUnit={unit}
//         setSelectedUnit={(newUnit) => {
//           setUnit(newUnit);
//           handleChange();
//         }}
//       />
//       {question.hint && <p className="text-gray-500 text-sm mt-1">{question.hint}</p>}
//     </div>
//   );
// };

// 'use client';

// import { useState, useEffect } from 'react';
// import { useAppStore, QuestionItem } from '@/store/useAppStore';
// import { UnitSelector } from '../UnitSelector/UnitSelector';
// import { showErrorToast } from '@/components/modules/toasts/ErrorToast';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';

// interface Props {
//   question: QuestionItem;
//   selectedAnswer: string | null;
//   setAnswer: (answer: string) => void;
// }

// export const NumberSliderQuestion = ({ question, selectedAnswer, setAnswer }: Props) => {
//   const { isContinueAllowed } = useAppStore();

//   const min = question.validation?.min || 0;
//   const max = question.validation?.max || 100;
//   const step = question.validation?.step || 1;
//   const units = question.validation?.units || ['m', 'ft', 'in'];

//   const parseAnswer = (answer: string | null) => {
//     if (answer) {
//       const [value, unit] = answer.split(' ');
//       return { value: parseFloat(value) || min, unit: unit || units[0] };
//     }
//     return { value: min, unit: units[0] };
//   };

//   const [value, setValue] = useState<number>(parseAnswer(selectedAnswer).value);
//   const [unit, setUnit] = useState<string>(parseAnswer(selectedAnswer).unit);

//   useEffect(() => {
//     const { value, unit } = parseAnswer(selectedAnswer);
//     setValue(value);
//     setUnit(unit);
//   }, [selectedAnswer, min, units]);

//   const handleChange = () => {
//     if (isContinueAllowed(question, false)) {
//       setAnswer(`${value} ${unit}`);
//     } else {
//       showErrorToast({
//         title: 'ورودی نامعتبر',
//         description: question.validation?.errorMessage || 'لطفاً یک مقدار معتبر انتخاب کنید.',
//       });
//     }
//   };

//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <div className="flex flex-col gap-2 mt-4 cursor-help">
//             <label className="font-medium text-gray-700 dark:text-gray-200">{question.title}</label>
//             <input
//               type="range"
//               aria-label={`اسلایدر برای ${question.title}`}
//               min={min}
//               max={max}
//               step={step}
//               value={value}
//               onChange={(e) => {
//                 setValue(Number(e.target.value));
//                 handleChange();
//               }}
//               className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg accent-primary-500 focus:ring-2 focus:ring-primary-500 transition-all duration-200"
//             />
//             <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
//               <span>{min}</span>
//               <span className="font-semibold">{value} {unit}</span>
//               <span>{max}</span>
//             </div>
//             <UnitSelector
//               units={units}
//               selectedUnit={unit}
//               setSelectedUnit={(newUnit) => {
//                 setUnit(newUnit);
//                 handleChange();
//               }}
//             />
//             {question.hint && (
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{question.hint}</p>
//             )}
//           </div>
//         </TooltipTrigger>
//         {question.hint && (
//           <TooltipContent
//             side="right"
//             align="start"
//             className="max-w-md p-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg text-gray-700 dark:text-gray-200 animate-in fade-in-0 zoom-in-95 duration-200"
//           >
//             <p className="text-sm leading-relaxed">{question.hint}</p>
//           </TooltipContent>
//         )}
//       </Tooltip>
//     </TooltipProvider>
//   );
// };

// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useAppStore, QuestionItem } from '@/store/useAppStore';
// import { UnitSelector } from '../UnitSelector/UnitSelector';
// import { showErrorToast } from '@/components/modules/toasts/ErrorToast';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
// import { debounce } from 'lodash'; // Assuming lodash is installed for debouncing

// interface Props {
//   question: QuestionItem;
//   selectedAnswer: string | null;
//   setAnswer: (answer: string) => void;
// }

// export const NumberSliderQuestion = ({ question, selectedAnswer, setAnswer }: Props) => {
//   const { isContinueAllowed } = useAppStore();

//   const min = question.validation?.min || 0;
//   const max = question.validation?.max || 100;
//   const step = question.validation?.step || 1;
//   const units = question.validation?.units || ['m', 'ft', 'in'];

//   const parseAnswer = (answer: string | null) => {
//     if (answer) {
//       const [value, unit] = answer.split(' ');
//       const parsedValue = parseFloat(value);
//       return {
//         value: isNaN(parsedValue) ? min : Math.max(min, Math.min(max, parsedValue)),
//         unit: unit || units[0],
//       };
//     }
//     return { value: min, unit: units[0] };
//   };

//   const [value, setValue] = useState<number>(parseAnswer(selectedAnswer).value);
//   const [unit, setUnit] = useState<string>(parseAnswer(selectedAnswer).unit);

//   useEffect(() => {
//     const { value, unit } = parseAnswer(selectedAnswer);
//     setValue(value);
//     setUnit(unit);
//   }, [selectedAnswer, min, units]);

//   // Debounced handleChange to prevent rapid error toasts
//   const handleChange = useCallback(
//     debounce(() => {
//       if (isContinueAllowed(question, false)) {
//         setAnswer(`${value} ${unit}`);
//       } else {
//         showErrorToast({
//           title: 'ورودی نامعتبر',
//           description: question.validation?.errorMessage || 'لطفاً یک مقدار معتبر انتخاب کنید.',
//         });
//       }
//     }, 500), // 500ms debounce
//     [value, unit, question, isContinueAllowed, setAnswer]
//   );

//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <div className="flex flex-col gap-2 mt-4 cursor-help">
//             <input
//               type="range"
//               aria-label={`اسلایدر برای ${question.title}`}
//               min={min}
//               max={max}
//               step={step}
//               value={value}
//               onChange={(e) => {
//                 setValue(Number(e.target.value));
//               }}
//               onMouseUp={handleChange}
//               onTouchEnd={handleChange}
//               className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg accent-primary-500 focus:ring-2 focus:ring-primary-500 transition-all duration-200"
//             />
//             <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
//               <span>{min}</span>
//               <span className="font-semibold bg-primary-100 dark:bg-primary-900 px-2 py-1 rounded-md">
//                 {value} {unit}
//               </span>
//               <span>{max}</span>
//             </div>
//             <UnitSelector
//               units={units}
//               selectedUnit={unit}
//               setSelectedUnit={(newUnit) => {
//                 setUnit(newUnit);
//                 handleChange();
//               }}
//             />
//             {question.hint && (
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{question.hint}</p>
//             )}
//           </div>
//         </TooltipTrigger>
//         {question.hint && (
//           <TooltipContent
//             side="right"
//             align="start"
//             className="max-w-md p-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg text-gray-700 dark:text-gray-200 animate-in fade-in-0 zoom-in-95 duration-200"
//           >
//             <p className="text-sm leading-relaxed">{question.hint}</p>
//           </TooltipContent>
//         )}
//       </Tooltip>
//     </TooltipProvider>
//   );
// };

// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useAppStore, QuestionItem } from '@/store/useAppStore';
// import { UnitSelector } from '../UnitSelector/UnitSelector';
// import { showErrorToast } from '@/components/modules/toasts/ErrorToast';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
// import { debounce } from 'lodash';

// interface Props {
//   question: QuestionItem;
//   selectedAnswer: string | null;
//   setAnswer: (answer: string) => void;
// }

// export const NumberSliderQuestion = ({
//   question,
//   selectedAnswer,
//   setAnswer,
// }: Props) => {
//   const { isContinueAllowed } = useAppStore();

//   const min = question.validation?.min || 0;
//   const max = question.validation?.max || 100;
//   const step = question.validation?.step || 1;
//   const units = question.validation?.units || ['m', 'ft', 'in'];

//   const parseAnswer = (answer: string | null) => {
//     if (answer) {
//       const [value, unit] = answer.split(' ');
//       const parsedValue = parseFloat(value);
//       return {
//         value: isNaN(parsedValue)
//           ? min
//           : Math.max(min, Math.min(max, parsedValue)),
//         unit: unit || units[0],
//       };
//     }
//     return { value: min, unit: units[0] };
//   };

//   const [value, setValue] = useState<number>(parseAnswer(selectedAnswer).value);
//   const [unit, setUnit] = useState<string>(parseAnswer(selectedAnswer).unit);

//   useEffect(() => {
//     const { value, unit } = parseAnswer(selectedAnswer);
//     setValue(value);
//     setUnit(unit);
//   }, [selectedAnswer, min, units]);

//   const handleChange = useCallback(
//     debounce(() => {
//       if (isContinueAllowed(question, false)) {
//         setAnswer(`${value} ${unit}`);
//       } else {
//         showErrorToast({
//           title: 'ورودی نامعتبر',
//           description:
//             question.validation?.errorMessage ||
//             'لطفاً یک مقدار معتبر انتخاب کنید.',
//         });
//       }
//     }, 500),
//     [value, unit, question, isContinueAllowed, setAnswer]
//   );

//   // آرایه‌ی مقادیر برای رسم خط‌کش
//   const ticks = Array.from(
//     { length: Math.floor((max - min) / step) + 1 },
//     (_, i) => min + i * step
//   );

//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <div className="flex flex-col gap-4 mt-4 cursor-help">
//             {/* اسلایدر + خط‌کش */}
//             <div className="w-full flex flex-col gap-2">
//               <input
//                 type="range"
//                 aria-label={`اسلایدر برای ${question.title}`}
//                 min={min}
//                 max={max}
//                 step={step}
//                 value={value}
//                 onChange={(e) => setValue(Number(e.target.value))}
//                 onMouseUp={handleChange}
//                 onTouchEnd={handleChange}
//                 className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
//               />

//               {/* خط‌کش */}
//               <div className="relative w-full">
//                 <div className="flex justify-between items-end w-full">
//                   {ticks.map((num, i) => {
//                     const isMajor = num % (step * 10) === 0;
//                     return (
//                       <div
//                         key={i}
//                         className={`flex flex-col items-center ${
//                           isMajor ? 'gap-1' : ''
//                         }`}
//                         style={{ flex: 1 }}
//                       >
//                         <div
//                           className={`bg-gray-700 dark:bg-gray-300 ${
//                             isMajor ? 'h-6 w-0.5' : 'h-3 w-0.5'
//                           }`}
//                         />
//                         {isMajor && (
//                           <span className="text-xs text-gray-600 dark:text-gray-300">
//                             {num}
//                           </span>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             {/* مقدار انتخابی */}
//             <div className="flex justify-center text-sm text-gray-600 dark:text-gray-400">
//               <span className="font-semibold bg-primary-100 dark:bg-primary-900 px-2 py-1 rounded-md">
//                 {value} {unit}
//               </span>
//             </div>

//             {/* انتخاب واحد */}
//             <UnitSelector
//               units={units}
//               selectedUnit={unit}
//               setSelectedUnit={(newUnit) => {
//                 setUnit(newUnit);
//                 handleChange();
//               }}
//             />

//             {/* hint */}
//             {question.hint && (
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                 {question.hint}
//               </p>
//             )}
//           </div>
//         </TooltipTrigger>

//         {question.hint && (
//           <TooltipContent
//             side="right"
//             align="start"
//             className="max-w-md p-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg text-gray-700 dark:text-gray-200 animate-in fade-in-0 zoom-in-95 duration-200"
//           >
//             <p className="text-sm leading-relaxed">{question.hint}</p>
//           </TooltipContent>
//         )}
//       </Tooltip>
//     </TooltipProvider>
//   );
// };

// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useAppStore, QuestionItem } from '@/store/useAppStore';
// import { UnitSelector } from '../UnitSelector/UnitSelector';
// import { showErrorToast } from '@/components/modules/toasts/ErrorToast';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
// import { debounce } from 'lodash';

// interface Props {
//   question: QuestionItem;
//   selectedAnswer: string | null;
//   setAnswer: (answer: string) => void;
// }

// export const NumberSliderQuestion = ({
//   question,
//   selectedAnswer,
//   setAnswer,
// }: Props) => {
//   const { isContinueAllowed } = useAppStore();

//   const min = question.validation?.min || 0;
//   const max = question.validation?.max || 100;
//   const step = question.validation?.step || 1;
//   const units = question.validation?.units || ['m', 'ft', 'in'];

//   const parseAnswer = (answer: string | null) => {
//     if (answer) {
//       const [value, unit] = answer.split(' ');
//       const parsedValue = parseFloat(value);
//       return {
//         value: isNaN(parsedValue)
//           ? min
//           : Math.max(min, Math.min(max, parsedValue)),
//         unit: unit || units[0],
//       };
//     }
//     return { value: min, unit: units[0] };
//   };

//   const [value, setValue] = useState<number>(parseAnswer(selectedAnswer).value);
//   const [unit, setUnit] = useState<string>(parseAnswer(selectedAnswer).unit);

//   useEffect(() => {
//     const { value, unit } = parseAnswer(selectedAnswer);
//     setValue(value);
//     setUnit(unit);
//   }, [selectedAnswer, min, units]);

//   const handleChange = useCallback(
//     debounce(() => {
//       if (isContinueAllowed(question, false)) {
//         setAnswer(`${value} ${unit}`);
//       } else {
//         showErrorToast({
//           title: 'ورودی نامعتبر',
//           description:
//             question.validation?.errorMessage ||
//             'لطفاً یک مقدار معتبر انتخاب کنید.',
//         });
//       }
//     }, 500),
//     [value, unit, question, isContinueAllowed, setAnswer]
//   );

//   // ساخت آرایه برای خط‌کش
//   const ticks = Array.from(
//     { length: Math.floor((max - min) / step) + 1 },
//     (_, i) => min + i * step
//   );

//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <div className="flex flex-col gap-6 mt-6 cursor-help">
//             {/* اسلایدر سفارشی با خط‌کش */}
//             <div className="relative w-full">
//               {/* ورودی اصلی */}
//               <input
//                 type="range"
//                 aria-label='range'
//                 min={min}
//                 max={max}
//                 step={step}
//                 value={value}
//                 onChange={(e) => setValue(Number(e.target.value))}
//                 onMouseUp={handleChange}
//                 onTouchEnd={handleChange}
//                 className="w-full appearance-none bg-transparent pointer-events-none"
//               />

//               {/* خط زمینه */}
//               <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 dark:bg-gray-700 rounded-full -translate-y-1/2" />

//               {/* خط فعال (تا مقدار انتخابی) */}
//               <div
//                 className="absolute top-1/2 left-0 h-1 bg-yellow-500 rounded-full -translate-y-1/2"
//                 style={{ width: `${((value - min) / (max - min)) * 100}%` }}
//               />

//               {/* هندل سفارشی */}
//               <div
//                 className="absolute top-1/2 w-5 h-5 bg-yellow-500 border-2 border-white dark:border-gray-800 rounded-full shadow -translate-y-1/2 -translate-x-1/2 cursor-grab"
//                 style={{ left: `${((value - min) / (max - min)) * 100}%` }}
//               >
//                 {/* مقدار انتخابی بالای هندل */}
//                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow whitespace-nowrap">
//                   {value} {unit}
//                 </div>
//               </div>

//               {/* خط‌کش زیر اسلایدر */}
//               <div className="flex justify-between mt-6">
//                 {ticks.map((num, i) => {
//                   const isMajor = num % (step * 10) === 0;
//                   return (
//                     <div key={i} className="flex flex-col items-center">
//                       <div
//                         className={`${
//                           isMajor
//                             ? 'h-6 w-0.5 bg-gray-700 dark:bg-gray-300'
//                             : 'h-3 w-px bg-gray-400 dark:bg-gray-600'
//                         }`}
//                       />
//                       {isMajor && (
//                         <span className="text-xs text-gray-600 dark:text-gray-300 mt-1">
//                           {num}
//                         </span>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* انتخاب واحد */}
//             <UnitSelector
//               units={units}
//               selectedUnit={unit}
//               setSelectedUnit={(newUnit) => {
//                 setUnit(newUnit);
//                 handleChange();
//               }}
//             />

//             {/* hint */}
//             {question.hint && (
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                 {question.hint}
//               </p>
//             )}
//           </div>
//         </TooltipTrigger>

//         {question.hint && (
//           <TooltipContent
//             side="right"
//             align="start"
//             className="max-w-md p-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg text-gray-700 dark:text-gray-200 animate-in fade-in-0 zoom-in-95 duration-200"
//           >
//             <p className="text-sm leading-relaxed">{question.hint}</p>
//           </TooltipContent>
//         )}
//       </Tooltip>
//     </TooltipProvider>
//   );
// };

// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useAppStore, QuestionItem } from "@/store/useAppStore";
// import { UnitSelector } from "../UnitSelector/UnitSelector";
// import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { debounce } from "lodash";

// interface Props {
//   question: QuestionItem;
//   selectedAnswer: string | null;
//   setAnswer: (answer: string) => void;
// }

// export const NumberSliderQuestion = ({
//   question,
//   selectedAnswer,
//   setAnswer,
// }: Props) => {
//   const { isContinueAllowed } = useAppStore();

//   const min = question.validation?.min || 0;
//   const max = question.validation?.max || 100;
//   const step = question.validation?.step || 1;
//   const units = question.validation?.units || ["m", "ft", "in"];

//   const parseAnswer = (answer: string | null) => {
//     if (answer) {
//       const [value, unit] = answer.split(" ");
//       const parsedValue = parseFloat(value);
//       return {
//         value: isNaN(parsedValue)
//           ? min
//           : Math.max(min, Math.min(max, parsedValue)),
//         unit: unit || units[0],
//       };
//     }
//     return { value: min, unit: units[0] };
//   };

//   const [value, setValue] = useState<number>(parseAnswer(selectedAnswer).value);
//   const [unit, setUnit] = useState<string>(parseAnswer(selectedAnswer).unit);
//   const [inputValue, setInputValue] = useState<string>(`${value}`);

//   useEffect(() => {
//     const { value, unit } = parseAnswer(selectedAnswer);
//     setValue(value);
//     setUnit(unit);
//     setInputValue(`${value}`);
//   }, [selectedAnswer, min, units]);

//   const handleChange = useCallback(
//     debounce(() => {
//       if (isContinueAllowed(question, false)) {
//         setAnswer(`${value} ${unit}`);
//       } else {
//         showErrorToast({
//           title: "ورودی نامعتبر",
//           description:
//             question.validation?.errorMessage ||
//             "لطفاً یک مقدار معتبر انتخاب کنید.",
//         });
//       }
//     }, 500),
//     [value, unit, question, isContinueAllowed, setAnswer]
//   );

//   // آرایه ticks برای خط‌کش
//   const ticks = Array.from(
//     { length: Math.floor((max - min) / step) + 1 },
//     (_, i) => min + i * step
//   );

//   // وقتی کاربر مقدار دلخواه وارد کرد
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };

//   const handleInputBlur = () => {
//     const parsed = parseFloat(inputValue);
//     if (!isNaN(parsed)) {
//       setValue(parsed);
//       setAnswer(`${parsed} ${unit}`);
//     } else {
//       showErrorToast({
//         title: "مقدار نامعتبر",
//         description: "لطفاً یک عدد معتبر وارد کنید.",
//       });
//     }
//   };

//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <div className="flex flex-col gap-6 mt-6 cursor-help">
//             {/* اسلایدر + خط‌کش */}
//             <div className="relative w-full">
//               <input
//                 type="range"
//                 aria-label="range"
//                 min={min}
//                 max={max}
//                 step={step}
//                 value={value}
//                 onChange={(e) => {
//                   const val = Number(e.target.value);
//                   setValue(val);
//                   setInputValue(`${val}`);
//                 }}
//                 onMouseUp={handleChange}
//                 onTouchEnd={handleChange}
//                 className="w-full appearance-none bg-transparent pointer-events-none"
//               />

//               {/* خط زمینه */}
//               <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 dark:bg-gray-700 rounded-full -translate-y-1/2" />

//               {/* خط فعال */}
//               <div
//                 className="absolute top-1/2 left-0 h-1 bg-indigo-400 rounded-full -translate-y-1/2"
//                 style={{ width: `${((value - min) / (max - min)) * 100}%` }}
//               />

//               {/* هندل */}
//               <div
//                 className="absolute top-1/2 w-4 h-4 bg-indigo-500 border-2 border-white dark:border-gray-800 rounded-full shadow -translate-y-1/2 -translate-x-1/2 cursor-grab"
//                 style={{ left: `${((value - min) / (max - min)) * 100}%` }}
//               >
//                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow whitespace-nowrap">
//                   {value} {unit}
//                 </div>
//               </div>

//               {/* خط‌کش */}
//               <div className="flex justify-between mt-6">
//                 {ticks.map((num, i) => {
//                   const isMajor = num % (step * 10) === 0;
//                   return (
//                     <div key={i} className="flex flex-col items-center">
//                       <div
//                         className={`${
//                           isMajor
//                             ? "h-6 w-0.5 bg-gray-700 dark:bg-gray-300"
//                             : "h-3 w-px bg-gray-400 dark:bg-gray-600"
//                         }`}
//                       />
//                       {isMajor && (
//                         <span className="text-xs text-gray-600 dark:text-gray-300 mt-1">
//                           {num}
//                         </span>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             <div className="flex gap-20">
//               {/* Input برای مقدار دلخواه */}
//               <div className="flex items-center gap-2 mt-2 order-1">
//                 <input
//                   type="number"
//                   value={inputValue}
//                   onChange={handleInputChange}
//                   onBlur={handleInputBlur}
//                   placeholder="عدد مورد نظر"
//                   className="w-24 px-2 py-1 border rounded-md border-gray-300 dark:border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-200"
//                 />
//                 <span className="text-sm text-gray-700 dark:text-gray-300">
//                   {unit}
//                 </span>
//               </div>

//               {/* انتخاب واحد */}
//               <UnitSelector
//                 units={units}
//                 selectedUnit={unit}
//                 setSelectedUnit={(newUnit) => {
//                   setUnit(newUnit);
//                   handleChange();
//                 }}
//               />
//             </div>

//             {/* hint */}
//             {question.hint && (
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                 {question.hint}
//               </p>
//             )}
//           </div>
//         </TooltipTrigger>

//         {question.hint && (
//           <TooltipContent
//             side="right"
//             align="start"
//             className="max-w-md p-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg text-gray-700 dark:text-gray-200 animate-in fade-in-0 zoom-in-95 duration-200"
//           >
//             <p className="text-sm leading-relaxed">{question.hint}</p>
//           </TooltipContent>
//         )}
//       </Tooltip>
//     </TooltipProvider>
//   );
// };

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useAppStore, QuestionItem } from "@/store/useAppStore";
// import { UnitSelector } from "../UnitSelector/UnitSelector";
// import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { debounce } from "lodash";

// interface Props {
//   question: QuestionItem;
//   isFirstQuiz: boolean;
// }

// export const NumberSliderQuestion = ({ question, isFirstQuiz }: Props) => {
//   const { setAnswer, getAnswerForQuestion, isContinueAllowed } = useAppStore();

//   const min = question.validation?.min || 0;
//   const max = question.validation?.max || 100;
//   const step = question.validation?.step || 1;
//   const units = question.validation?.units || ["m", "ft", "in"];

//   // مقدار اولیه از store
//   const initialAnswer = getAnswerForQuestion(question.id, isFirstQuiz) as
//     | string
//     | null;

//   const parseAnswer = (answer: string | null) => {
//     if (answer) {
//       const [value, unit] = answer.split(" ");
//       const parsedValue = parseFloat(value);
//       return {
//         value: isNaN(parsedValue)
//           ? min
//           : Math.max(min, Math.min(max, parsedValue)),
//         unit: unit || units[0],
//       };
//     }
//     return { value: min, unit: units[0] };
//   };

//   const { value: initialValue, unit: initialUnit } = parseAnswer(initialAnswer);

//   const [value, setValue] = useState<number>(initialValue);
//   const [unit, setUnit] = useState<string>(initialUnit);
//   const [inputValue, setInputValue] = useState<string>(`${initialValue}`);

//   // debounce فقط یک بار
//   const debouncedSaveRef = useRef(
//     debounce((val: number, u: string) => {
//       setAnswer(question, `${val} ${u}`, isFirstQuiz);
//     }, 300)
//   );

//   // سینک شدن با store در mount
//   useEffect(() => {
//     const { value, unit } = parseAnswer(
//       getAnswerForQuestion(question.id, isFirstQuiz) as string | null
//     );
//     setValue(value);
//     setUnit(unit);
//     setInputValue(`${value}`);
//   }, [getAnswerForQuestion, question.id, isFirstQuiz]);

//   // اسلایدر
//   const handleSliderChange = (val: number) => {
//     setValue(val);
//     setInputValue(`${val}`);
//     debouncedSaveRef.current(val, unit);
//   };

//   // input عددی
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
//       setInputValue(`${value}`); // revert
//     }
//   };

//   // تغییر واحد
//   const handleUnitChange = (newUnit: string) => {
//     setUnit(newUnit);
//     setAnswer(question, `${value} ${newUnit}`, isFirstQuiz);
//   };

//   // آرایه ticks برای خط‌کش
//   const ticks = Array.from(
//     { length: Math.floor((max - min) / step) + 1 },
//     (_, i) => min + i * step
//   );

//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <div className="flex flex-col gap-6 mt-6 cursor-help">
//             {/* اسلایدر */}
//             <div className="relative w-full">
//               <input
//                 type="range"
//                 aria-label="range"
//                 min={min}
//                 max={max}
//                 step={step}
//                 value={value}
//                 onChange={(e) => {
//                   const val = Number(e.target.value);
//                   setValue(val); // مقدار در UI
//                   setInputValue(`${val}`);
//                   debouncedSaveRef.current(val, unit); // ذخیره در store
//                 }}
//                 className="w-full appearance-none bg-transparent"
//               />

//               <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 dark:bg-gray-700 rounded-full -translate-y-1/2" />
//               <div
//                 className="absolute top-1/2 left-0 h-1 bg-indigo-400 rounded-full -translate-y-1/2"
//                 style={{ width: `${((value - min) / (max - min)) * 100}%` }}
//               />
//               <div
//                 className="absolute top-1/2 w-4 h-4 bg-indigo-500 border-2 border-white dark:border-gray-800 rounded-full shadow -translate-y-1/2 -translate-x-1/2 cursor-grab"
//                 style={{ left: `${((value - min) / (max - min)) * 100}%` }}
//               >
//                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow whitespace-nowrap">
//                   {value} {unit}
//                 </div>
//               </div>

//               {/* خط‌کش */}
//               <div className="flex justify-between mt-6">
//                 {ticks.map((num, i) => {
//                   const isMajor = num % (step * 10) === 0;
//                   return (
//                     <div key={i} className="flex flex-col items-center">
//                       <div
//                         className={`${
//                           isMajor
//                             ? "h-6 w-0.5 bg-gray-700"
//                             : "h-3 w-px bg-gray-400"
//                         }`}
//                       />
//                       {isMajor && <span className="text-xs mt-1">{num}</span>}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* input و UnitSelector */}
//             <div className="flex gap-20">
//               <div className="flex items-center gap-2 mt-2">
//                 <input
//                   type="number"
//                   aria-label="number"
//                   value={inputValue}
//                   onChange={handleInputChange}
//                   onBlur={handleInputBlur}
//                   className="w-24 px-2 py-1 border rounded-md border-gray-300 dark:border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-200"
//                 />
//                 <span>{unit}</span>
//               </div>
//               <UnitSelector
//                 units={units}
//                 selectedUnit={unit}
//                 setSelectedUnit={handleUnitChange}
//               />
//             </div>

//             {/* hint */}
//             {question.hint && (
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                 {question.hint}
//               </p>
//             )}
//           </div>
//         </TooltipTrigger>

//         {question.hint && (
//           <TooltipContent
//             side="right"
//             align="start"
//             className="max-w-md p-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg text-gray-700 dark:text-gray-200 animate-in fade-in-0 zoom-in-95 duration-200"
//           >
//             <p className="text-sm leading-relaxed">{question.hint}</p>
//           </TooltipContent>
//         )}
//       </Tooltip>
//     </TooltipProvider>
//   );
// };


// 'use client';

// import { useState, useEffect, useRef } from "react";
// import { useAppStore, QuestionItem } from "@/store/useAppStore";
// import { UnitSelector } from "../UnitSelector/UnitSelector";
// import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
// import { debounce } from "lodash";

// interface Props {
//   question: QuestionItem;
//   isFirstQuiz: boolean;
// }

// export const NumberSliderQuestion = ({ question, isFirstQuiz }: Props) => {
//   const { setAnswer, getAnswerForQuestion } = useAppStore();

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
//     }, 300)
//   );

//   useEffect(() => {
//     const { value, unit } = parseAnswer(getAnswerForQuestion(question.id, isFirstQuiz) as string | null);
//     setValue(value);
//     setUnit(unit);
//     setInputValue(`${value}`);
//   }, [getAnswerForQuestion, question.id, isFirstQuiz]);

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

//   const ticks = Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step);

//   return (
//     <div className="flex flex-col gap-6 mt-6">
//       {/* اسلایدر روی خط */}
//       <div className="relative w-full h-12">
//         <input
//           type="range"
//           aria-label="range"
//           min={min}
//           max={max}
//           step={step}
//           value={value}
//           onChange={(e) => handleSliderChange(Number(e.target.value))}
//           className="absolute w-full h-2 top-1/2 -translate-y-1/2 appearance-none bg-gray-300 rounded-full z-10"
//         />

//         {/* خط فعال */}
//         <div
//           className="absolute top-1/2 h-2 bg-indigo-400 rounded-full -translate-y-1/2 pointer-events-none"
//           style={{ width: `${((value - min) / (max - min)) * 100}%` }}
//         />

//         {/* هندل و tooltip */}
//         <div
//           className="absolute top-1/2 w-0 h-0 bg-indigo-500 border-2 border-white rounded-full shadow -translate-y-1/2 -translate-x-1/2 pointer-events-none"
//           style={{ left: `${((value - min) / (max - min)) * 100 }%` }}
//         >
//           <div className="absolute -top-12 left-2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow">
//             {value} {unit}
//           </div>
//         </div>

//         {/* ticks بالای خط */}
//         <div className="absolute w-full flex justify-between top-8">
//           {ticks.map((num, i) => {
//             const isMajor = num % (step * 10) === 0;
//             return (
//               <div key={i} className="flex flex-col items-center">
//                 <div className={`${isMajor ? "h-4 w-0.5 bg-gray-700" : "h-2 w-px bg-gray-500"}`} />
//                 {isMajor && <span className="text-xs mt-1">{num}</span>}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* input و UnitSelector */}
//       <div className="flex gap-20 mt-4">
//         <div className="flex items-center gap-2">
//           <input
//             type="number"
//             aria-label="number"
//             value={inputValue}
//             onChange={handleInputChange}
//             onBlur={handleInputBlur}
//             className="w-24 px-2 py-1 border rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-200"
//           />
//           <span>{unit}</span>
//         </div>
//         <UnitSelector units={units} selectedUnit={unit} setSelectedUnit={handleUnitChange} />
//       </div>

//       {/* hint */}
//       {question.hint && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{question.hint}</p>}
//     </div>
//   );
// };


// 'use client';

// import { useState, useEffect, useRef } from "react";
// import { useAppStore, QuestionItem } from "@/store/useAppStore";
// import { UnitSelector } from "../UnitSelector/UnitSelector";
// import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
// import { debounce } from "lodash";

// interface Props {
//   question: QuestionItem;
//   isFirstQuiz: boolean;
// }

// export const NumberSliderQuestion = ({ question, isFirstQuiz }: Props) => {
//   const { setAnswer, getAnswerForQuestion } = useAppStore();

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

//   const sliderRef = useRef<HTMLDivElement>(null);
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

//   // Ticks array
//   const ticks = Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step);

//   // محاسبه درصد موقعیت tick روی خط
//   const getPercent = (val: number) => {
//     return ticks.indexOf(val) / (ticks.length - 1) * 100;
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
//       {/* slider و خط */}
//       <div className="relative w-full h-12" ref={sliderRef}>
//         {/* base line */}
//         <div className="absolute top-1/2 w-full h-2 bg-gray-201 dark:bg-gray-700 rounded-full -translate-y-1/2" />

//         {/* active line */}
//         <div
//           className="absolute top-1/2 h-2 bg-blue-500 rounded-full -translate-y-1/2 pointer-events-none"
//           style={{ width: `${getPercent(value +1)}%` }}
//         />

//         {/* ticks */}
//         <div className="absolute w-full flex justify-between top-8 left-2">
//           {ticks.map((num, i) => {
//             const isMajor = num % (step * 10) === 0;
//             return (
//               <div key={i} className="flex flex-col items-center">
//                 <div className={`${isMajor ? "h-4 w-0.5 bg-gray-700" : "h-2 w-px bg-gray-500"}`} />
//                 {isMajor && <span className="text-xs mt-1">{num}</span>}
//               </div>
//             );
//           })}
//         </div>

//         {/* handle */}
//         <input
//           type="range"
//           aria-label="range"
//           min={0}
//           max={ticks.length - 1}
//           step={1}
//           value={ticks.indexOf(value)}
//           onChange={(e) => handleSliderChange(ticks[Number(e.target.value)])}
//           className="absolute w-full h-2 top-1/2 -translate-y-1/2 appearance-none bg-transparent z-10 cursor-grab"
//         />

//         {/* tooltip */}
//         <div
//           className="absolute top-1/2 w-0 h-0 bg-indigo-500 border-2 border-white rounded-full shadow -translate-y-1/2 -translate-x-1/2 pointer-events-none z-50"
//           style={{ left: `${getPercent(value)}%` }}
//         >
//           <div className="absolute -top-14 left-2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow">
//             {value} {unit}
//           </div>
//         </div>
//       </div>

//       {/* input و unit */}
//       <div className="flex gap-20 mt-4">
//         <div className="flex items-center gap-2">
//           <input
//             type="number"
//             aria-label="number"
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


// 'use client';

// import { useState, useEffect, useRef } from "react";
// import { useAppStore, QuestionItem } from "@/store/useAppStore";
// import { UnitSelector } from "../UnitSelector/UnitSelector";
// import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
// import { debounce } from "lodash";

// interface Props {
//   question: QuestionItem;
//   isFirstQuiz: boolean;
// }

// export const NumberSliderQuestion = ({ question, isFirstQuiz }: Props) => {
//   const { setAnswer, getAnswerForQuestion } = useAppStore();

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
//       <div className="relative w-full h-12">
//         {/* base line */}
//         <div className="absolute top-1/2 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full -translate-y-1/2 pointer-events-none" />

//         {/* active line */}
//         <div
//           className="absolute top-1/2 h-2 bg-indigo-500 rounded-full -translate-y-1/2 pointer-events-none"
//           style={{ width: `${getPercent(value)}%` }}
//         />

//         {/* ticks */}
//         <div className="absolute w-full flex justify-between top-8 left-1">
//           {ticks.map((num, i) => {
//             const isMajor = num % (step * 10) === 0;
//             return (
//               <div key={i} className="flex flex-col items-center">
//                 <div className={`${isMajor ? "h-4 w-0.5 bg-gray-700" : "h-2 w-px bg-gray-500"}`} />
//                 {isMajor && <span className="text-xs mt-1">{num}</span>}
//               </div>
//             );
//           })}
//         </div>

//         {/* slider input */}
//         <input
//           type="range"
//           aria-label="Measurement Slider"
//           min={0}
//           max={ticks.length - 1}
//           step={1}
//           value={ticks.indexOf(value)}
//           onChange={(e) => handleSliderChange(ticks[Number(e.target.value)])}
//           className="absolute w-full h-2 top-1/2 -translate-y-1/2 appearance-none bg-transparent z-10 cursor-grab"
//           style={{ WebkitAppearance: "none" }}
//         />

//         {/* custom handle with tooltip */}
//         <div
//           className="absolute top-1/2 w-4 h-4 bg-indigo-500 border border-indigo-600  rounded-full shadow -translate-y-1/2 -translate-x-1/2 pointer-events-none"
//           style={{ left: `${getPercent(value)}%` }}
//         >
//           <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow">
//             {value} {unit}
//           </div>
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
import { useAppStore, QuestionItem } from "@/store/useAppStore";
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
  const { getAnswerForQuestion } = useAppStore();

  const min = question.validation?.min || 0;
  const max = question.validation?.max || 100;
  const step = question.validation?.step || 1;
  const units = question.validation?.units || ["m", "ft", "in"];

  const initialAnswer = getAnswerForQuestion(question.id, isFirstQuiz) as string | null;

  const parseAnswer = (answer: string | null) => {
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

  const { value: initialValue, unit: initialUnit } = parseAnswer(initialAnswer);
  const [value, setValue] = useState<number>(initialValue);
  const [unit, setUnit] = useState<string>(initialUnit);
  const [inputValue, setInputValue] = useState<string>(`${initialValue}`);

  const debouncedSaveRef = useRef(
    debounce((val: number, u: string) => {
      setAnswer(question, `${val} ${u}`, isFirstQuiz);
    }, 200)
  );

  useEffect(() => {
    const { value, unit } = parseAnswer(getAnswerForQuestion(question.id, isFirstQuiz) as string | null);
    setValue(value);
    setUnit(unit);
    setInputValue(`${value}`);
  }, [getAnswerForQuestion, question.id, isFirstQuiz]);

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
