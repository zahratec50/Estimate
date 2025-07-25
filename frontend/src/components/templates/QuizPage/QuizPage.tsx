// "use client";
// import Header from "@/components/modules/Header/Header";
// import ProgressSegment from "@/components/modules/ProgressBar/ProgressBar";
// import React from "react";
// import { useState } from "react";

// import { IoCheckmarkOutline } from "react-icons/io5";

// export default function QuizPage() {
//   const [selectedOption, setSelectedOption] = useState<number | null>(1);
//   const options = [
//     { title: "Card Title", description: "Card Description" },
//     { title: "Option Title", description: "Option Description" },
//     { title: "Option Title", description: "Option Description" },
//     { title: "Option Title", description: "Option Description" },
//   ];
//   const progress = 40; // Example progress percent

//   const handleOptionClick = (index: number) => {
//     setSelectedOption(index);
//   };

//   return (
//     <div className="w-[350px] md:w-[500px] lg:w-[700px] xl:w-[700px] 2xl:w-[900px] font-roboto">
//       {/* Question Header */}

//       <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-black-50 mb-2">
//         Question Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//         eiusmod tempor incididunt ut labore et dolore magna aliqua?
//       </h1>
//       {/* Subtitle */}
//       <p className="text-md md:text-lg lg:text-xl text-neutral-700 mb-6">
//         Hint Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//         eiusmod tempor incididunt ut labore et dolore magna aliqua?
//       </p>

//       {/* Options Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:pb-[80px]">
//         {options.map((option, index) => (
//           <button
//             key={index}
//             onClick={() => handleOptionClick(index + 1)}
//             className={`relative p-4 rounded-lg border transition-all duration-200 ${
//               selectedOption === index + 1
//                 ? "border-primary-500 bg-primary-50 shadow-lg"
//                 : "border-neutral-300 bg-white hover:bg-neutral-50"
//             }`}
//           >
//             {selectedOption === index + 1 && (
//               <div className="absolute -top-3 right-4 rounded-lg p-1 bg-primary-500 text-white">
//                 <IoCheckmarkOutline />
//               </div>
//             )}

//             <h3 className="text-lg sm:text-xl text-black-50 font-medium text-left">
//               {option.title}
//             </h3>
//             <p className="text-xs sm:text-sm text-secondary-600 text-left">
//               {option.description}
//             </p>
//           </button>
//         ))}
//       </div>

      
//     </div>
//   );
// }
// "use client";

// import { useState, useCallback, useEffect } from "react";
// import { IoCheckmarkOutline } from "react-icons/io5";
// import clsx from "clsx";

// const questions = [
//   {
//     question: "Question 1: What is React?",
//     hint: "Hint: It's a JavaScript library.",
//     options: [
//       { title: "Library", description: "Reusable UI components" },
//       { title: "Framework", description: "Like Angular" },
//       { title: "Language", description: "New programming language" },
//       { title: "Tool", description: "Development tool" },
//     ],
//   },
//   {
//     question: "Question 2: What is JSX?",
//     hint: "Hint: Syntax extension for JavaScript.",
//     options: [
//       { title: "HTML", description: "Like HTML" },
//       { title: "JSX", description: "Mixing HTML with JS" },
//       { title: "TSX", description: "TypeScript JSX" },
//       { title: "XML", description: "Markup language" },
//     ],
//   },
//   {
//     question: "Question 3: What is useState?",
//     hint: "Hint: React Hook for state.",
//     options: [
//       { title: "State", description: "Manage state" },
//       { title: "Effect", description: "Manage side effects" },
//       { title: "Ref", description: "Manage DOM" },
//       { title: "Hook", description: "Custom logic" },
//     ],
//   },
//   {
//     question: "Question 4: What is Next.js?",
//     hint: "Hint: React framework.",
//     options: [
//       { title: "Framework", description: "React-based framework" },
//       { title: "Library", description: "Just a library" },
//       { title: "CMS", description: "Content tool" },
//       { title: "API tool", description: "Backend only" },
//     ],
//   },
// ];


// export default function QuizPage({ step }: { step: number }) {
//   const [selectedOption, setSelectedOption] = useState<number | null>(1);

//   const handleOptionClick = useCallback((index: number) => {
//     setSelectedOption(index);
//   }, []);

//   const currentQuestion = questions[step - 1];

//   useEffect(() => {
//     setSelectedOption(null);
//   }, [step]);

//   return (
//     <div className="w-full max-w-[900px] font-roboto px-4 sm:px-0">
//       {/* Question Title */}
//       <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-black-50 mb-2">
//         {currentQuestion.question}
//       </h1>

//       {/* Subtitle */}
//       <p className="text-md md:text-lg lg:text-xl text-neutral-700 mb-6">
//         {currentQuestion.hint}
//       </p>

//       {/* Options */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:pb-[80px]">
//         {currentQuestion.options.map((option, index) => {
//           const isSelected = selectedOption === index + 1;
//           return (
//             <button
//               key={index}
//               onClick={() => handleOptionClick(index + 1)}
//               className={clsx(
//                 "relative p-4 rounded-lg border transition-all duration-200 text-left",
//                 {
//                   "border-primary-500 bg-primary-50 shadow-lg": isSelected,
//                   "border-neutral-300 bg-white hover:bg-neutral-50": !isSelected,
//                 }
//               )}
//             >
//               {isSelected && (
//                 <span className="absolute -top-3 right-4 p-1 bg-primary-500 text-white rounded-lg">
//                   <IoCheckmarkOutline />
//                 </span>
//               )}
//               <h3 className="text-lg sm:text-xl text-black-50 font-medium">
//                 {option.title}
//               </h3>
//               <p className="text-xs sm:text-sm text-secondary-600">
//                 {option.description}
//               </p>
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useCallback } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import clsx from "clsx";

const questions = [
  {
    question: "What is 2 + 2?",
    hint: "It's the result of adding two pairs.",
    options: [
      { title: "3", description: "Not quite right" },
      { title: "4", description: "Correct answer" },
      { title: "5", description: "Too high" },
      { title: "22", description: "This is a trick!" },
    ],
  },
  {
    question: "What is the capital of France?",
    hint: "City of lights.",
    options: [
      { title: "London", description: "That's the UK." },
      { title: "Paris", description: "Correct!" },
      { title: "Berlin", description: "That's Germany." },
      { title: "Madrid", description: "That's Spain." },
    ],
  },
  {
    question: "Which is a JavaScript framework?",
    hint: "It starts with 'R'.",
    options: [
      { title: "Laravel", description: "PHP framework" },
      { title: "Django", description: "Python framework" },
      { title: "React", description: "Yes!" },
      { title: "Ruby", description: "A language, not JS framework" },
    ],
  },
  {
    question: "What color do you get by mixing red and white?",
    hint: "It's a shade often associated with calm and love.",
    options: [
      { title: "Pink", description: "Correct!" },
      { title: "Purple", description: "Not quite right" },
      { title: "Orange", description: "Nope" },
      { title: "Brown", description: "Too dull!" },
    ],
  },
];

export default function QuizPage({ currentStep }: { currentStep: number }) {
  const isValidStep =
    typeof currentStep === "number" &&
    currentStep >= 1 &&
    currentStep <= questions.length;

  const questionData = isValidStep ? questions[currentStep - 1] : null;
  console.log(questionData);
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionClick = useCallback((index: number) => {
    setSelectedOption(index);
  }, []);

  if (!questionData) {
    return (
      <div className="w-full text-center mt-10 text-red-500 text-lg">
        Question not found. Please check the URL or step number.
      </div>
    );
  }

  return (
    <div className="w-full max-w-[900px] font-roboto px-4 sm:px-0">
      {/* Question Title */}
      <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-black-50 mb-2">
        Question: {questionData.question}
      </h1>

      {/* Subtitle */}
      <p className="text-md md:text-lg lg:text-xl text-neutral-700 mb-6">
        Hint: {questionData.hint}
      </p>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:pb-[80px]">
        {questionData.options.map((option, index) => {
          const isSelected = selectedOption === index;
          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={clsx(
                "relative p-4 rounded-lg border transition-all duration-200 text-left",
                {
                  "border-primary-500 bg-primary-50 shadow-lg": isSelected,
                  "border-neutral-300 bg-white hover:bg-neutral-50": !isSelected,
                }
              )}
            >
              {isSelected && (
                <span className="absolute -top-3 right-4 p-1 bg-primary-500 text-white rounded-lg">
                  <IoCheckmarkOutline />
                </span>
              )}
              <h3 className="text-lg sm:text-xl text-black-50 font-medium">
                {option.title}
              </h3>
              <p className="text-xs sm:text-sm text-secondary-600">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// "use client";

// import { useState, useCallback } from "react";
// import { IoCheckmarkOutline } from "react-icons/io5";
// import clsx from "clsx";
// import ProgressSegment from "@/components/modules/ProgressBar/ProgressBar";
// import QuizNavigation from "@/components/templates/QuizNavigation/QuizNavigation";

// const questions = [
//   {
//     question: "What is 2 + 2?",
//     hint: "It's the result of adding two pairs.",
//     options: [
//       { title: "3", description: "Not quite right" },
//       { title: "4", description: "Correct answer" },
//       { title: "5", description: "Too high" },
//       { title: "22", description: "This is a trick!" },
//     ],
//   },
//   {
//     question: "What is the capital of France?",
//     hint: "City of lights.",
//     options: [
//       { title: "London", description: "That's the UK." },
//       { title: "Paris", description: "Correct!" },
//       { title: "Berlin", description: "That's Germany." },
//       { title: "Madrid", description: "That's Spain." },
//     ],
//   },
//   {
//     question: "Which is a JavaScript framework?",
//     hint: "It starts with 'R'.",
//     options: [
//       { title: "Laravel", description: "PHP framework" },
//       { title: "Django", description: "Python framework" },
//       { title: "React", description: "Yes!" },
//       { title: "Ruby", description: "A language, not JS framework" },
//     ],
//   },
//   {
//     question: "What color do you get by mixing red and white?",
//     hint: "It's a shade often associated with calm and love.",
//     options: [
//       { title: "Pink", description: "Correct!" },
//       { title: "Purple", description: "Not quite right" },
//       { title: "Orange", description: "Nope" },
//       { title: "Brown", description: "Too dull!" },
//     ],
//   },
// ];

// export default function Quiz({ params }: { params: { numberPage?: string } }) {
//   const step = parseInt(params.numberPage ?? "", 10);
//   const isValidStep = !isNaN(step) && step >= 1 && step <= questions.length;

//   const questionData = isValidStep ? questions[step - 1] : null;
//   const [selectedOption, setSelectedOption] = useState<number | null>(null);

//   const handleOptionClick = useCallback((index: number) => {
//     setSelectedOption(index);
//   }, []);

//   if (!isValidStep || !questionData) {
//     return (
//       <div className="w-full text-center mt-10 text-red-500 text-lg">
//         Question not found. Please check the URL or step number.
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Progress bar for mobile */}
//       <div className="flex sm:hidden justify-center mb-4">
//         <ProgressSegment numberPage={step} />
//       </div>

//       {/* Quiz Content */}
//       <div className="flex items-center justify-center w-full">
//         <div className="w-full max-w-[900px] font-roboto px-4 sm:px-0">
//           {/* Question Title */}
//           <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-black-50 mb-2">
//             Question: {questionData.question}
//           </h1>

//           {/* Subtitle */}
//           <p className="text-md md:text-lg lg:text-xl text-neutral-700 mb-6">
//             Hint: {questionData.hint}
//           </p>

//           {/* Options */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:pb-[80px]">
//             {questionData.options.map((option, index) => {
//               const isSelected = selectedOption === index;
//               return (
//                 <button
//                   key={index}
//                   onClick={() => handleOptionClick(index)}
//                   className={clsx(
//                     "relative p-4 rounded-lg border transition-all duration-200 text-left",
//                     {
//                       "border-primary-500 bg-primary-50 shadow-lg": isSelected,
//                       "border-neutral-300 bg-white hover:bg-neutral-50": !isSelected,
//                     }
//                   )}
//                 >
//                   {isSelected && (
//                     <span className="absolute -top-3 right-4 p-1 bg-primary-500 text-white rounded-lg">
//                       <IoCheckmarkOutline />
//                     </span>
//                   )}
//                   <h3 className="text-lg sm:text-xl text-black-50 font-medium">
//                     {option.title}
//                   </h3>
//                   <p className="text-xs sm:text-sm text-secondary-600">
//                     {option.description}
//                   </p>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Navigation and progress for larger screens */}
//       <div className="w-full sm:max-w-screen-lg flex flex-col items-center justify-center xl:justify-between px-4 mt-6">
//         <hr className="w-full hidden sm:block my-4" />
//         <div className="w-full mt-auto flex items-center justify-between sm:gap-4">
//           <div className="hidden sm:block">
//             <ProgressSegment numberPage={step} />
//           </div>
//           <QuizNavigation currentPage={step} />
//         </div>
//       </div>
//     </>
//   );
// }
