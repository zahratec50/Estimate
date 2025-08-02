// // "use client";

// // import { useAppStore } from "@/store/useAppStore";
// // import { useEffect, useMemo } from "react";
// // import { IoCheckmarkOutline } from "react-icons/io5";
// // import clsx from "clsx";
// // import firstQuestion from "@/data/firstQuestion.json";
// // import states from "@/data/states.json";

// // const questions = [
// //   {
// //     question: "What is 2 + 2?",
// //     hint: "It's the result of adding two pairs.",
// //     options: [
// //       { title: "3", description: "Not quite right" },
// //       { title: "4", description: "Correct answer" },
// //       { title: "5", description: "Too high" },
// //       { title: "22", description: "This is a trick!" },
// //     ],
// //   },
// //   {
// //     question: "What is the capital of France?",
// //     hint: "City of lights.",
// //     options: [
// //       { title: "London", description: "That's the UK." },
// //       { title: "Paris", description: "Correct!" },
// //       { title: "Berlin", description: "That's Germany." },
// //       { title: "Madrid", description: "That's Spain." },
// //     ],
// //   },
// //   {
// //     question: "Which is a JavaScript framework?",
// //     hint: "It starts with 'R'.",
// //     options: [
// //       { title: "Laravel", description: "PHP framework" },
// //       { title: "Django", description: "Python framework" },
// //       { title: "React", description: "Yes!" },
// //       { title: "Ruby", description: "A language, not JS framework" },
// //     ],
// //   },
// //   {
// //     question:
// //       "What color do you get by mixing red and white and white and white and white and white and white?",
// //     hint: "It's a shade often associated with calm and love.",
// //     options: [
// //       { title: "Pink", description: "Correct!" },
// //       { title: "Purple", description: "Not quite right" },
// //       { title: "Orange", description: "Nope" },
// //       { title: "Brown", description: "Too dull!" },
// //     ],
// //   },
// // ];

// // type QuestionProps = {
// //   isHelpOpen: boolean;
// // };

// // export default function QuizPage({ isHelpOpen }: QuestionProps) {
// //   const currentStep = useAppStore((state) => state.currentStep);
// //   const isRegistered = useAppStore((state) => state.isRegistered);
// //   const currentProjectId = useAppStore((state) => state.currentProjectId);
// //   const setPreQuizAnswer = useAppStore((state) => state.setPreQuizAnswer);
// //   const setMainQuizAnswer = useAppStore((state) => state.setMainQuizAnswer);

// //   const selectedOption = useAppStore((state) => {
// //     if (isRegistered && currentProjectId) {
// //       const project = state.projects.find((p) => p.id === currentProjectId);
// //       return (
// //         project?.mainQuizAnswers.find(
// //           (a) => a.questionIndex === currentStep - 1
// //         )?.selectedOption ?? null
// //       );
// //     }
// //     return (
// //       state.preQuizAnswers.find((a) => a.questionIndex === currentStep - 1)
// //         ?.selectedOption ?? null
// //     );
// //   });
// //   type QuestionItem = {
// //     question: string;
// //     answers: string[];
// //   };
// //   const questionData: QuestionItem | null = useMemo(() => {
// //   return currentStep >= 1 && currentStep <= firstQuestion.length
// //     ? firstQuestion[currentStep - 1]
// //     : null;
// // }, [currentStep]);

// //   const handleOptionClick = (index: number) => {
// //     if (isRegistered && currentProjectId) {
// //       setMainQuizAnswer(currentProjectId, currentStep - 1, index);
// //     } else {
// //       setPreQuizAnswer(currentStep - 1, index);
// //     }
// //   };

// //   if (!questionData) {
// //     return (
// //       <div className="w-full text-center mt-10 text-red-500 dark:text-red-300 text-lg">
// //         Question not found. Please check the URL or step number.
// //       </div>
// //     );
// //   }

// //   //! ایجاد حلقه برای شناسایی سوالات و طبق سوالات تعیین شده شیوه ی جواب دادن به سوالات مشخص بشه
// //   //! سوالات را از آرایه بگیریم و برای هر سوال یک کامپوننت ایجاد کنیم(ایده ی هوش مصنوعی)
// //   //todo:  توی فایل useAppStore جوابها رو به صورت استربنگ ذخیره کن و توی این فایل مشخص کن چه چیزی قراره دخیره بشه
// //   //todo: بجای ذخیره ی ایندکس سوال خود سوال رو دخیره کن

// //   return (
// //     <div
// //       className={`w-full  ${
// //         isHelpOpen ? "max-w-[800px]" : "max-w-full"
// //       } font-roboto px-4 sm:px-0`}
// //     >
// //       <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-black-50 mb-2 dark:text-white">
// //         Question: {questionData.question}
// //       </h1>
// //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:pb-[80px]">
// //         {questionData.answers[0] === "City and state dropdown" ? (
// //           <div>
// //             <select name="state" id="state">
// //               {states.countries.USA.map(
// //                 (state: string, index: number): JSX.Element => (
// //                   <option value={state} key={index}>
// //                     {state}
// //                   </option>
// //                 )
// //               )}
// //             </select>
// //           </div>
// //         ) : questionData.answers[0] === "Text input" ? (
// //           <div>
// //             <input type="text" placeholder="Email or Number" />
// //           </div>
// //         ) : (
// //           <>
// //             {questionData.answers.map((option: string, index: any) => {
// //               const isSelected = selectedOption === index;
// //               return (
// //                 <button
// //                   key={index}
// //                   onClick={() => handleOptionClick(index)}
// //                   className={clsx(
// //                     "relative p-4 rounded-lg border transition-all duration-200 text-left",
// //                     {
// //                       "border-primary-500 bg-primary-50 dark:border-secondary-500 dark:bg-secondary-800 shadow-lg":
// //                         isSelected,
// //                       "border-neutral-300 hover:bg-primary-50 dark:border-secondary-500 dark:hover:bg-secondary-800 dark:bg-secondary-900":
// //                         !isSelected,
// //                     }
// //                   )}
// //                 >
// //                   {isSelected && (
// //                     <span className="absolute -top-3 right-4 p-1 bg-primary-500 dark:bg-secondary-500 dark:text-secondary-900 text-white rounded-lg">
// //                       <IoCheckmarkOutline />
// //                     </span>
// //                   )}
// //                   <h3 className="text-lg sm:text-xl text-black-50 dark:text-white font-medium">
// //                     {option}
// //                   </h3>
// //                 </button>
// //               );
// //             })}
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useAppStore } from "@/store/useAppStore";
// import { useMemo, useState } from "react";
// import { IoCheckmarkOutline } from "react-icons/io5";
// import clsx from "clsx";
// import firstQuestion from "@/data/firstQuestion.json";
// import states from "@/data/states.json";

// type QuestionProps = {
//   isHelpOpen: boolean;
// };

// type QuestionItem = {
//   question: string;
//   answers: string[];
// };

// export default function QuizPage({ isHelpOpen }: QuestionProps) {
//   const currentStep = useAppStore((state) => state.currentStep);
//   const isRegistered = useAppStore((state) => state.isRegistered);
//   const currentProjectId = useAppStore((state) => state.currentProjectId);
//   const setPreQuizAnswer = useAppStore((state) => state.setPreQuizAnswer);
//   const setMainQuizAnswer = useAppStore((state) => state.setMainQuizAnswer);

//   const questionData: QuestionItem | null = useMemo(() => {
//     return currentStep >= 1 && currentStep <= firstQuestion.length
//       ? firstQuestion[currentStep - 1]
//       : null;
//   }, [currentStep]);

//   const selectedAnswer = useAppStore((state) => {
//     const questionText = questionData?.question;
//     if (!questionText) return null;

//     if (isRegistered && currentProjectId) {
//       const project = state.projects.find((p) => p.id === currentProjectId);
//       return project?.mainQuizAnswers.find((a) => a.question === questionText)?.answer ?? null;
//     }

//     return state.preQuizAnswers.find((a) => a.question === questionText)?.answer ?? null;
//   });

//   const [inputValue, setInputValue] = useState("");

//   const handleOptionClick = (answer: string) => {
//     const questionText = questionData?.question;
//     if (!questionText) return;

//     if (isRegistered && currentProjectId) {
//       setMainQuizAnswer(currentProjectId, questionText, answer);
//     } else {
//       setPreQuizAnswer(questionText, answer);
//     }
//   };

//   const handleInputSubmit = () => {
//     if (inputValue.trim() === "") return;
//     const questionText = questionData?.question;
//     if (!questionText) return;

//     if (isRegistered && currentProjectId) {
//       setMainQuizAnswer(currentProjectId, questionText, inputValue.trim());
//     } else {
//       setPreQuizAnswer(questionText, inputValue.trim());
//     }
//   };

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
//       <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-black-50 mb-2 dark:text-white">
//         Question: {questionData.question}
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:pb-[80px]">
//         {questionData.answers[0] === "City and state dropdown" ? (
//           <div className="col-span-full">
//             <select
//               name="state"
//               id="state"
//               className="w-full border p-2 rounded"
//               onChange={(e) => handleOptionClick(e.target.value)}
//               value={selectedAnswer ?? ""}
//             >
//               <option value="">Select a state</option>
//               {states.countries.USA.map((state: string, index: number) => (
//                 <option value={state} key={index}>
//                   {state}
//                 </option>
//               ))}
//             </select>
//           </div>
//         ) : questionData.answers[0] === "Text input" ? (
//           <div className="col-span-full flex gap-2">
//             <input
//               type="text"
//               placeholder="Email or Phone"
//               className="w-full border p-2 rounded"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//             />
//             <button
//               onClick={handleInputSubmit}
//               className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
//             >
//               Submit
//             </button>
//           </div>
//         ) : (
//           questionData.answers.map((option: string, index: number) => {
//             const isSelected = selectedAnswer === option;

//             return (
//               <button
//                 key={index}
//                 onClick={() => handleOptionClick(option)}
//                 className={clsx(
//                   "relative p-4 rounded-lg border transition-all duration-200 text-left",
//                   {
//                     "border-primary-500 bg-primary-50 dark:border-secondary-500 dark:bg-secondary-800 shadow-lg":
//                       isSelected,
//                     "border-neutral-300 hover:bg-primary-50 dark:border-secondary-500 dark:hover:bg-secondary-800 dark:bg-secondary-900":
//                       !isSelected,
//                   }
//                 )}
//               >
//                 {isSelected && (
//                   <span className="absolute -top-3 right-4 p-1 bg-primary-500 dark:bg-secondary-500 dark:text-secondary-900 text-white rounded-lg">
//                     <IoCheckmarkOutline />
//                   </span>
//                 )}
//                 <h3 className="text-lg sm:text-xl text-black-50 dark:text-white font-medium">
//                   {option}
//                 </h3>
//               </button>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useAppStore } from "@/store/useAppStore";
// import { useMemo, useState, useEffect } from "react";
// import { IoCheckmarkOutline } from "react-icons/io5";
// import clsx from "clsx";
// import firstQuestion from "@/data/firstQuestion.json";
// import states from "@/data/states.json";

// type QuestionProps = {
//   isHelpOpen: boolean;
// };

// type QuestionItem = {
//   question: string;
//   answers: string[];
// };

// export default function QuizPage({ isHelpOpen }: QuestionProps) {
//   const currentStep = useAppStore((state) => state.currentStep);
//   const isRegistered = useAppStore((state) => state.isRegistered);
//   const currentProjectId = useAppStore((state) => state.currentProjectId);
//   const setPreQuizAnswer = useAppStore((state) => state.setPreQuizAnswer);
//   const setMainQuizAnswer = useAppStore((state) => state.setMainQuizAnswer);

//   const questionData: QuestionItem | null = useMemo(() => {
//     return currentStep >= 1 && currentStep <= firstQuestion.length
//       ? firstQuestion[currentStep - 1]
//       : null;
//   }, [currentStep]);

//   // حالت selectedAnswer را از store میگیریم، چون جوابها به صورت رشته ذخیره شده
//   const selectedAnswer = useAppStore((state) => {
//     const questionText = questionData?.question;
//     if (!questionText) return null;

//     if (isRegistered && currentProjectId) {
//       const project = state.projects.find((p) => p.id === currentProjectId);
//       return (
//         project?.mainQuizAnswers.find((a) => a.question === questionText)
//           ?.answer ?? null
//       );
//     }

//     return (
//       state.preQuizAnswers.find((a) => a.question === questionText)?.answer ??
//       null
//     );
//   });

//   // state داخلی برای کنترل input متنی (ایمیل یا شماره)
//   const [inputValue, setInputValue] = useState("");

//   // وقتی selectedAnswer تغییر کرد، مقدار inputValue رو آپدیت میکنیم که در input نمایش داده بشه (برای سوالات متنی)
//   useEffect(() => {
//     console.log("states.countries.USA:", states.countries?.USA);

//     // فقط اگر سوال از نوع Text input باشه
//     if (questionData?.answers[0] === "Text input" && selectedAnswer) {
//       setInputValue(selectedAnswer);
//     } else {
//       setInputValue("");
//     }
//   }, [selectedAnswer, questionData]);

//   // تابع ذخیره جواب برای سوالات دکمه‌ای و select
//   const handleOptionClick = (answer: string) => {
//     const questionText = questionData?.question;
//     if (!questionText) return;

//     if (isRegistered && currentProjectId) {
//       setMainQuizAnswer(currentProjectId, questionText, answer);
//     } else {
//       setPreQuizAnswer(questionText, answer);
//     }
//   };

//   // تابع ذخیره جواب برای input متنی
//   const handleInputSubmit = () => {
//     if (inputValue.trim() === "") return;
//     const questionText = questionData?.question;
//     if (!questionText) return;

//     if (isRegistered && currentProjectId) {
//       setMainQuizAnswer(currentProjectId, questionText, inputValue.trim());
//     } else {
//       setPreQuizAnswer(questionText, inputValue.trim());
//     }
//   };

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
//       <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-black-50 mb-2 dark:text-white">
//         Question: {questionData.question}
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:pb-[80px]">
//         {questionData.answers && questionData.answers.length > 0 ? (
//           questionData.answers[0] === "City and state dropdown" ? (
//             <div className="col-span-full">
//               <select
//                 name="state"
//                 id="state"
//                 className="w-full border p-2 rounded"
//                 onChange={(e) => handleOptionClick(e.target.value)}
//                 value={selectedAnswer ?? ""}
//               >
//                 <option value="">Select a state</option>
//                 {Object.keys(states.countries.USA).map((state: string, index: number) => (
//                   <option value={state} key={index}>
//                     {state}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 name="city"
//                 id="city"
//                 className="w-full border p-2 rounded"
//                 onChange={(e) => handleOptionClick(e.target.value)}
//                 value={selectedAnswer ?? ""}
//               >
//                 <option value="">Select a city</option>
//                 {Object.values(states.countries.USA).map((city: string, index: number) => (
//                   <option value={city} key={index}>
//                     {city}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           ) : questionData.answers[0] === "Text input" ? (
//             <div className="col-span-full flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Email or Phone"
//                 className="w-full border p-2 rounded"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//               />
//               <button
//                 onClick={handleInputSubmit}
//                 className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
//                 disabled={inputValue.trim() === ""}
//               >
//                 Submit
//               </button>
//             </div>
//           ) : (
//             questionData.answers.map((option: string, index: number) => {
//               const isSelected = selectedAnswer === option;
//               return (
//                 <button
//                   key={index}
//                   onClick={() => handleOptionClick(option)}
//                   className={clsx(
//                     "relative p-4 rounded-lg border transition-all duration-200 text-left",
//                     {
//                       "border-primary-500 bg-primary-50 dark:border-secondary-500 dark:bg-secondary-800 shadow-lg":
//                         isSelected,
//                       "border-neutral-300 hover:bg-primary-50 dark:border-secondary-500 dark:hover:bg-secondary-800 dark:bg-secondary-900":
//                         !isSelected,
//                     }
//                   )}
//                 >
//                   {isSelected && (
//                     <span className="absolute -top-3 right-4 p-1 bg-primary-500 dark:bg-secondary-500 dark:text-secondary-900 text-white rounded-lg">
//                       <IoCheckmarkOutline />
//                     </span>
//                   )}
//                   <h3 className="text-lg sm:text-xl text-black-50 dark:text-white font-medium">
//                     {option}
//                   </h3>
//                 </button>
//               );
//             })
//           )
//         ) : (
//           <div className="text-red-500 dark:text-red-300">
//             Invalid question format.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useAppStore } from "@/store/useAppStore";
// import { useMemo, useState, useEffect } from "react";
// import { IoCheckmarkOutline } from "react-icons/io5";
// import clsx from "clsx";
// import firstQuestion from "@/data/firstQuestion.json";
// import states from "@/data/states.json";

// type QuestionProps = {
//   isHelpOpen: boolean;
// };

// type QuestionItem = {
//   question: string;
//   answers: string[];
// };

// export default function QuizPage({ isHelpOpen }: QuestionProps) {
//   const currentStep = useAppStore((state) => state.currentStep);
//   const isRegistered = useAppStore((state) => state.isRegistered);
//   const currentProjectId = useAppStore((state) => state.currentProjectId);
//   const setPreQuizAnswer = useAppStore((state) => state.setPreQuizAnswer);
//   const setMainQuizAnswer = useAppStore((state) => state.setMainQuizAnswer);

//   // داده سوال جاری
//   const questionData: QuestionItem | null = useMemo(() => {
//     return currentStep >= 1 && currentStep <= firstQuestion.length
//       ? firstQuestion[currentStep - 1]
//       : null;
//   }, [currentStep]);

//   // پاسخ انتخاب شده از استور (رشته)
//   const selectedAnswer = useAppStore((state) => {
//     const questionText = questionData?.question;
//     if (!questionText) return null;

//     if (isRegistered && currentProjectId) {
//       const project = state.projects.find((p) => p.id === currentProjectId);
//       return (
//         project?.mainQuizAnswers.find((a) => a.question === questionText)
//           ?.answer ?? null
//       );
//     }

//     return (
//       state.preQuizAnswers.find((a) => a.question === questionText)?.answer ??
//       null
//     );
//   });

//   // برای سوال City and state dropdown
//   const [selectedState, setSelectedState] = useState<string>(
//     selectedAnswer ? selectedAnswer.split(" - ")[0] : ""
//   );
//   const [selectedCity, setSelectedCity] = useState<string>(
//     selectedAnswer ? selectedAnswer.split(" - ")[1] || "" : ""
//   );

//   // هماهنگ سازی حالت داخلی با selectedAnswer زمانی که تغییر می‌کند
//   useEffect(() => {
//     if (selectedAnswer) {
//       const parts = selectedAnswer.split(" - ");
//       setSelectedState(parts[0] || "");
//       setSelectedCity(parts[1] || "");
//     } else {
//       setSelectedState("");
//       setSelectedCity("");
//     }
//   }, [selectedAnswer]);

//   // state برای input متنی (ایمیل یا شماره)
//   const [inputValue, setInputValue] = useState("");

//   // اگر سوال Text input و پاسخ داریم، مقدار input رو ست کن
//   useEffect(() => {
//     if (questionData?.answers[0] === "Text input" && selectedAnswer) {
//       setInputValue(selectedAnswer);
//     } else {
//       setInputValue("");
//     }
//   }, [selectedAnswer, questionData]);

//   // ذخیره پاسخ برای دکمه‌ها و select ساده
//   const saveAnswer = (answer: string) => {
//     const questionText = questionData?.question;
//     if (!questionText) return;

//     if (isRegistered && currentProjectId) {
//       setMainQuizAnswer(currentProjectId, questionText, answer);
//     } else {
//       setPreQuizAnswer(questionText, answer);
//     }
//   };

//   // هنگام انتخاب ایالت
//   const handleStateChange = (stateName: string) => {
//     setSelectedState(stateName);
//     setSelectedCity(""); // ریست شهر
//     saveAnswer(stateName); // موقتا فقط ایالت ذخیره شود
//   };

//   // هنگام انتخاب شهر
//   const handleCityChange = (cityName: string) => {
//     setSelectedCity(cityName);
//     if (selectedState) {
//       saveAnswer(`${selectedState} - ${cityName}`);
//     } else {
//       saveAnswer(cityName);
//     }
//   };

//   // انتخاب گزینه دکمه‌ای
//   const handleOptionClick = (answer: string) => {
//     saveAnswer(answer);
//   };

//   // ذخیره پاسخ input متنی با دکمه
//   const handleInputSubmit = () => {
//     if (inputValue.trim() === "") return;
//     saveAnswer(inputValue.trim());
//   };

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
//       <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-black-50 mb-2 dark:text-white">
//         Question: {questionData.question}
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:pb-[80px]">
//         {questionData.answers && questionData.answers.length > 0 ? (
//           questionData.answers[0] === "City and state dropdown" ? (
//             <div className="col-span-full flex flex-col gap-4">
//               <select
//                 name="state"
//                 id="state"
//                 className="w-full border p-2 rounded"
//                 onChange={(e) => handleStateChange(e.target.value)}
//                 value={selectedState}
//               >
//                 <option value="">Select a state</option>
//                 {Object.keys(states.countries.USA).map((state) => (
//                   <option key={state} value={state}>
//                     {state}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 name="city"
//                 id="city"
//                 className="w-full border p-2 rounded"
//                 onChange={(e) => handleCityChange(e.target.value)}
//                 value={selectedCity}
//                 disabled={!selectedState}
//               >
//                 <option value="">Select a city</option>
//                 {selectedState &&
//                   states.countries.USA[selectedState].map((city: string) => (
//                     <option key={city} value={city}>
//                       {city}
//                     </option>
//                   ))}
//               </select>
//             </div>
//           ) : questionData.answers[0] === "Text input" ? (
//             <div className="col-span-full flex">
//               <input
//                 type="text"
//                 placeholder="Email or Phone"
//                 className="w-full border p-2 rounded"
//                 value={inputValue}
//                 onChange={(e) => {
//                   const val = e.target.value;
//                   setInputValue(val);
//                   if (val.trim().length >= 5) {
//                     saveAnswer(val.trim());
//                   }
//                 }}
//               />
//             </div>
//           ) : (
//             questionData.answers.map((option: string, index: number) => {
//               const isSelected = selectedAnswer === option;
//               return (
//                 <button
//                   key={index}
//                   onClick={() => handleOptionClick(option)}
//                   className={clsx(
//                     "relative p-4 rounded-lg border transition-all duration-200 text-left",
//                     {
//                       "border-primary-500 bg-primary-50 dark:border-secondary-500 dark:bg-secondary-800 shadow-lg":
//                         isSelected,
//                       "border-neutral-300 hover:bg-primary-50 dark:border-secondary-500 dark:hover:bg-secondary-800 dark:bg-secondary-900":
//                         !isSelected,
//                     }
//                   )}
//                 >
//                   {isSelected && (
//                     <span className="absolute -top-3 right-4 p-1 bg-primary-500 dark:bg-secondary-500 dark:text-secondary-900 text-white rounded-lg">
//                       <IoCheckmarkOutline />
//                     </span>
//                   )}
//                   <h3 className="text-lg sm:text-xl text-black-50 dark:text-white font-medium">
//                     {option}
//                   </h3>
//                 </button>
//               );
//             })
//           )
//         ) : (
//           <div className="text-red-500 dark:text-red-300">
//             Invalid question format.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useAppStore } from "@/store/useAppStore";
import { useMemo, useState, useEffect } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import clsx from "clsx";
import firstQuestion from "@/data/firstQuestion.json";
import states from "@/data/states.json";

type QuestionProps = {
  isHelpOpen: boolean;
};

type QuestionItem = {
  question: string;
  answers: string[];
};

export default function QuizPage({ isHelpOpen }: QuestionProps) {
  const currentStep = useAppStore((state) => state.currentStep);
  const isRegistered = useAppStore((state) => state.isRegistered);
  const currentProjectId = useAppStore((state) => state.currentProjectId);
  const setPreQuizAnswer = useAppStore((state) => state.setPreQuizAnswer);
  const setMainQuizAnswer = useAppStore((state) => state.setMainQuizAnswer);

  // داده سوال جاری
  const questionData: QuestionItem | null = useMemo(() => {
    return currentStep >= 1 && currentStep <= firstQuestion.length
      ? firstQuestion[currentStep - 1]
      : null;
  }, [currentStep]);

  // پاسخ انتخاب شده از استور (رشته)
  const selectedAnswer = useAppStore((state) => {
    const questionText = questionData?.question;
    if (!questionText) return null;

    if (isRegistered && currentProjectId) {
      const project = state.projects.find((p) => p.id === currentProjectId);
      return (
        project?.mainQuizAnswers.find((a) => a.question === questionText)
          ?.answer ?? null
      );
    }

    return (
      state.preQuizAnswers.find((a) => a.question === questionText)?.answer ?? null
    );
  });

  // حالت داخلی برای ایالت و شهر
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  // Sync selectedAnswer با selectedState و selectedCity
  useEffect(() => {
    if (selectedAnswer) {
      const parts = selectedAnswer.split(" - ");
      setSelectedState(parts[0] || "");
      setSelectedCity(parts[1] || "");
    } else {
      setSelectedState("");
      setSelectedCity("");
    }
  }, [selectedAnswer]);

  // state برای input متنی (ایمیل یا شماره)
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (questionData?.answers[0] === "Text input" && selectedAnswer) {
      setInputValue(selectedAnswer);
    } else {
      setInputValue("");
    }
  }, [selectedAnswer, questionData]);

  // ذخیره پاسخ
  const saveAnswer = (answer: string) => {
    const questionText = questionData?.question;
    if (!questionText) return;

    if (isRegistered && currentProjectId) {
      setMainQuizAnswer(currentProjectId, questionText, answer);
    } else {
      setPreQuizAnswer(questionText, answer);
    }
  };

  // انتخاب ایالت
  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    setSelectedCity(""); // Reset city
    // موقتا ذخیره نکن چون شهر انتخاب نشده
  };

  // انتخاب شهر
  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    if (selectedState && cityName) {
      saveAnswer(`${selectedState} - ${cityName}`);
    }
  };

  // انتخاب گزینه دکمه‌ای
  const handleOptionClick = (answer: string) => {
    saveAnswer(answer);
  };

  // ذخیره پاسخ input متنی هنگام تغییر
  const handleInputChange = (val: string) => {
    setInputValue(val);
    if (val.trim().length >= 5) {
      saveAnswer(val.trim());
    }
  };

  if (!questionData) {
    return (
      <div className="w-full text-center mt-10 text-red-500 dark:text-red-300 text-lg">
        Question not found. Please check the URL or step number.
      </div>
    );
  }

  return (
    <div
      className={`w-full ${isHelpOpen ? "max-w-[800px]" : "max-w-full"} font-roboto px-4 sm:px-0`}
    >
      <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-black-50 mb-2 dark:text-white">
        Question: {questionData.question}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:pb-[80px]">
        {questionData.answers && questionData.answers.length > 0 ? (
          questionData.answers[0] === "City and state dropdown" ? (
            <div className="col-span-full flex flex-col gap-4">
              <select
                name="state"
                id="state"
                className="w-full border p-2 rounded"
                onChange={(e) => handleStateChange(e.target.value)}
                value={selectedState}
              >
                <option value="">Select a state</option>
                {Object.keys(states.countries.USA).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <select
                name="city"
                id="city"
                className="w-full border p-2 rounded"
                onChange={(e) => handleCityChange(e.target.value)}
                value={selectedCity}
                disabled={!selectedState}
              >
                <option value="">Select a city</option>
                {selectedState &&
                  states.countries.USA[selectedState]?.map((city: string) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>
          ) : questionData.answers[0] === "Text input" ? (
            <div className="col-span-full flex">
              <input
                type="text"
                placeholder="Email or Phone"
                className="w-full border p-2 rounded"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
              />
            </div>
          ) : (
            questionData.answers.map((option: string, index: number) => {
              const isSelected = selectedAnswer === option;
              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={clsx(
                    "relative p-4 rounded-lg border transition-all duration-200 text-left",
                    {
                      "border-primary-500 bg-primary-50 dark:border-secondary-500 dark:bg-secondary-800 shadow-lg": isSelected,
                      "border-neutral-300 hover:bg-primary-50 dark:border-secondary-500 dark:hover:bg-secondary-800 dark:bg-secondary-900": !isSelected,
                    }
                  )}
                >
                  {isSelected && (
                    <span className="absolute -top-3 right-4 p-1 bg-primary-500 dark:bg-secondary-500 dark:text-secondary-900 text-white rounded-lg">
                      <IoCheckmarkOutline />
                    </span>
                  )}
                  <h3 className="text-lg sm:text-xl text-black-50 dark:text-white font-medium">
                    {option}
                  </h3>
                </button>
              );
            })
          )
        ) : (
          <div className="text-red-500 dark:text-red-300">Invalid question format.</div>
        )}
      </div>
    </div>
  );
}
