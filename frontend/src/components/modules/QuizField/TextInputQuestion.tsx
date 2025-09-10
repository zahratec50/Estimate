// "use client";

// import { useState, useEffect, useCallback, memo } from "react";
// import clsx from "clsx";
// import { QuestionItem } from "@/store/useAppStore";

// interface TextInputQuestionProps {
//   questionData: QuestionItem;
//   selectedAnswer: string | string[] | null;
//   setAnswer: (answer: string | string[]) => void;
// }

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
// const usPhoneRegex = /^(?:\+1\s?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;

// const TextInputQuestion = memo(function TextInputQuestion({
//   questionData,
//   selectedAnswer,
//   setAnswer,
// }: TextInputQuestionProps) {
//   const [contactInput, setContactInput] = useState<string>("");
//   const [contactError, setContactError] = useState<string>("");

//   // بارگذاری پاسخ قبلی
//   useEffect(() => {
//     if (questionData.type === "text-input" && selectedAnswer) {
//       setContactInput(typeof selectedAnswer === "string" ? selectedAnswer : "");
//     } else if (questionData.type === "text" && selectedAnswer) {
//       setContactInput(typeof selectedAnswer === "string" ? selectedAnswer : "");
//     } else {
//       setContactInput("");
//     }
//   }, [selectedAnswer, questionData]);

//   const validateInput = useCallback(
//     (val: string) => {
//       const trimmed = val.trim();
//       const isValid = emailRegex.test(trimmed) || usPhoneRegex.test(trimmed);

//       if (trimmed === "") {
//         setContactError(
//           questionData.validation?.errorMessage || "This field is required."
//         );
//       } else if (!isValid && questionData.type === "text-input") {
//         setContactError(
//           questionData.fields?.[0]?.validation.errorMessage ||
//             "Please enter a valid email or US phone number."
//         );
//       } else if (!isValid && questionData.type === "text") {
//         setContactError(
//           questionData.validation?.errorMessage ||
//             "Please enter at least 5 characters."
//         );
//       } else {
//         setContactError("");
//       }
//     },
//     [questionData]
//   );

//   const handleInputChange = useCallback(
//     (val: string) => {
//       setContactInput(val);
//       setAnswer(val);
//       validateInput(val);
//     },
//     [setAnswer, validateInput]
//   );

//   return (
//     <div className="col-span-full md:w-1/2 flex flex-col mt-4 sm:pb-[80px]">
//       <input
//         type="text"
//         placeholder={
//           questionData.type === "text-input"
//             ? "Email or Phone Number"
//             : questionData.placeholder
//         }
//         className={clsx(
//           "w-full border p-2 rounded-lg outline-primary-500",
//           contactError
//             ? "border-red-500 focus:border-red-500"
//             : "border-gray-300 focus:border-primary-500"
//         )}
//         value={contactInput}
//         onChange={(e) => handleInputChange(e.target.value)}
//       />

//       {/* {questionData.type === "text-input" ? (
//         <input
//           type="text"
//           placeholder="Email or Phone Number"
//           className={clsx(
//             "w-full border p-2 rounded-lg outline-primary-500",
//             contactError
//               ? "border-red-500 focus:border-red-500"
//               : "border-gray-300 focus:border-primary-500"
//           )}
//           value={contactInput}
//           onChange={(e) => handleInputChange(e.target.value)}
//         />
//       ) : (
//         <input
//           type="text"
//           placeholder={questionData.placeholder}
//           className={clsx(
//             "w-full border p-2 rounded-lg outline-primary-500",
//             contactError
//               ? "border-red-500 focus:border-red-500"
//               : "border-gray-300 focus:border-primary-500"
//           )}
//           value={contactInput}
//           onChange={(e) => handleInputChange(e.target.value)}
//         />
//       )} */}

//       {contactError && questionData.type === "text-input" ? (
//         <p className="text-red-500 text-sm mt-1">{contactError}</p>
//       ) : (
//         <p className="text-red-500 text-sm mt-1">{contactError}</p>
//       )}
//     </div>
//   );
// });

// export default TextInputQuestion;

// "use client";

// import { useState, useEffect, useCallback, memo } from "react";
// import clsx from "clsx";
// import { QuestionItem } from "@/store/useAppStore";

// interface TextInputQuestionProps {
//   questionData: QuestionItem;
//   selectedAnswer: string | string[] | null;
//   setAnswer: (answer: string | string[]) => void;
// }

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
// const usPhoneRegex = /^(?:\+1\s?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;

// const TextInputQuestion = memo(function TextInputQuestion({
//   questionData,
//   selectedAnswer,
//   setAnswer,
// }: TextInputQuestionProps) {
//   const [contactInput, setContactInput] = useState<string>("");
//   const [contactError, setContactError] = useState<string>("");

//   // بارگذاری پاسخ قبلی
//   useEffect(() => {
//     if (selectedAnswer && typeof selectedAnswer === "string") {
//       setContactInput(selectedAnswer);
//     } else {
//       setContactInput("");
//     }
//   }, [selectedAnswer]);

//   const validateInput = useCallback(
//     (val: string) => {
//       const trimmed = val.trim();
//       const isValid = emailRegex.test(trimmed) || usPhoneRegex.test(trimmed);

//       if (trimmed === "") {
//         setContactError(
//           questionData.validation?.errorMessage || "This field is required."
//         );
//       } else if (questionData.type === "text-input" && !isValid) {
//         setContactError(
//           questionData.fields?.[0]?.validation.errorMessage ||
//             "Please enter a valid email or US phone number."
//         );
//       } else if (questionData.type === "text" && trimmed.length < 5) {
//         setContactError(
//           questionData.validation?.errorMessage ||
//             "Please enter at least 5 characters."
//         );
//       } else {
//         setContactError("");
//       }
//     },
//     [questionData]
//   );

//   // const handleInputChange = useCallback(
//   //   (val: string) => {
//   //     setContactInput(val);
//   //     setAnswer(val);
//   //     validateInput(val);
//   //   },
//   //   [setAnswer, validateInput]
//   // );

//   const handleInputChange = useCallback(
//     (val: string) => {
//       setContactInput(val);

//       const trimmed = val.trim();
//       let isValid = true;

//       if (trimmed === "") {
//         setContactError(
//           questionData.validation?.errorMessage || "This field is required."
//         );
//         isValid = false;
//       } else if (questionData.type === "text-input") {
//         isValid = emailRegex.test(trimmed) || usPhoneRegex.test(trimmed);
//         setContactError(
//           isValid
//             ? ""
//             : questionData.fields?.[0]?.validation.errorMessage ||
//                 "Please enter a valid email or US phone number."
//         );
//       } else if (questionData.type === "text" && trimmed.length < 5) {
//         setContactError(
//           questionData.validation?.errorMessage ||
//             "Please enter at least 5 characters."
//         );
//         isValid = false;
//       } else {
//         setContactError("");
//       }

//       if (isValid) {
//         setAnswer(trimmed); // ✅ فقط اگر معتبر بود در استور ذخیره می‌کنیم
//       } else {
//         setAnswer(""); // ❌ اگر نامعتبر بود مقدار استور خالی شود
//       }
//     },
//     [setAnswer, questionData]
//   );

//   // placeholder شرطی
//   const placeholder =
//     questionData.type === "text-input"
//       ? "Email or Phone Number"
//       : questionData.placeholder || "";

//   return (
//     <div className="col-span-full md:w-1/2 flex flex-col mt-4 sm:pb-[80px]">
//       <input
//         type="text"
//         placeholder={placeholder}
//         className={clsx(
//           "w-full border p-2 rounded-lg outline-primary-500",
//           contactError
//             ? "border-red-500 focus:border-red-500"
//             : "border-gray-300 focus:border-primary-500"
//         )}
//         value={contactInput}
//         onChange={(e) => handleInputChange(e.target.value)}
//       />

//       {contactError && (
//         <p className="text-red-500 text-sm mt-1">{contactError}</p>
//       )}
//     </div>
//   );
// });

// export default TextInputQuestion;


// "use client";

// import { useState, useEffect, useCallback, memo } from "react";
// import clsx from "clsx";
// import { QuestionItem } from "@/store/useAppStore";

// interface TextInputQuestionProps {
//   questionData: QuestionItem;
//   selectedAnswer: string | string[] | Record<string, string> | null;
//   setAnswer: (answer: string) => void;
// }

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
// const usPhoneRegex = /^(?:\+1\s?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;

// const TextInputQuestion = memo(function TextInputQuestion({
//   questionData,
//   selectedAnswer,
//   setAnswer,
// }: TextInputQuestionProps) {
//   const [contactInput, setContactInput] = useState<string>(""); 
//   const [contactError, setContactError] = useState<string>("");

//   // بارگذاری پاسخ قبلی
//   useEffect(() => {
//     if (selectedAnswer && typeof selectedAnswer === "string") {
//       setContactInput(selectedAnswer);
//     } else {
//       setContactInput("");
//     }
//   }, [selectedAnswer]);

//   const validateInput = useCallback(
//     (val: string) => {
//       const trimmed = val.trim();
//       let isValid = true;

//       if (trimmed === "") {
//         setContactError(
//           questionData.validation?.errorMessage || "This field is required."
//         );
//         isValid = false;
//       } else if (questionData.type === "text") {
//         isValid = emailRegex.test(trimmed) || usPhoneRegex.test(trimmed);
//         setContactError(
//           isValid
//             ? ""
//             : questionData.fields?.[0]?.validation.errorMessage ||
//                 "Please enter a valid email or US phone number."
//         );
//       } else {
//         setContactError("");
//       }

//       return isValid;
//     },
//     [questionData]
//   );

//   const handleInputChange = useCallback(
//     (val: string) => {
//       setContactInput(val);
//       const valid = validateInput(val);
//       setAnswer(valid ? val.trim() : ""); // ذخیره در استور فقط اگر معتبر بود
//     },
//     [setAnswer, validateInput]
//   );

//   const placeholder =
//     questionData.type === "text"
//       ? "Email or Phone Number"
//       : questionData.placeholder || "";

//   return (
//     <div className="col-span-full md:w-1/2 flex flex-col mt-4 sm:pb-[80px]">
//       <input
//         type="text"
//         placeholder={placeholder}
//         className={clsx(
//           "w-full border p-2 rounded-lg outline-primary-500",
//           contactError
//             ? "border-red-500 focus:border-red-500"
//             : "border-gray-300 focus:border-primary-500"
//         )}
//         value={contactInput}
//         onChange={(e) => handleInputChange(e.target.value)}
//       />
//       {contactError && (
//         <p className="text-red-500 text-sm mt-1">{contactError}</p>
//       )}
//     </div>
//   );
// });

// export default TextInputQuestion;


// "use client";

// import React, { useState, useCallback, useEffect } from "react";
// import { useAppStore } from "@/store/useAppStore";

// type Field = {
//   label: string;
//   placeholder?: string;
//   validation?: {
//     required?: boolean;
//     minLength?: number;
//     pattern?: string;
//     format?: "email" | "usPhone";
//     errorMessage?: string;
//   };
// };

// type QuestionData = {
//   id: string;
//   type: "text";
//   fields?: Field[];
//   validation?: {
//     required?: boolean;
//     minLength?: number;
//     pattern?: string;
//     errorMessage?: string;
//   };
// };

// type Props = {
//   questionData: QuestionData;
// };

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const usPhoneRegex = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;

// export const TextInputQuestion: React.FC<Props> = ({ questionData }) => {
//   const { setAnswer } = useAppStore();
//   const [inputValues, setInputValues] = useState<Record<string, string>>({});
//   const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

//   // اعتبارسنجی هر فیلد
//   const validateInput = useCallback(
//     (values: Record<string, string>) => {
//       const errors: Record<string, string> = {};
//       if (questionData.fields) {
//         questionData.fields.forEach((field) => {
//           const value = (values[field.label] || "").trim();
//           const v = field.validation;
//           if (v?.required && !value) {
//             errors[field.label] = v.errorMessage || "This field is required";
//             return;
//           }
//           if (v?.minLength && value.length < v.minLength) {
//             errors[field.label] = v.errorMessage || `Minimum ${v.minLength} characters required`;
//             return;
//           }
//           if (v?.pattern && !new RegExp(v.pattern).test(value)) {
//             errors[field.label] = v.errorMessage || "Invalid format";
//             return;
//           }
//           if (v?.format === "email" && !emailRegex.test(value)) {
//             errors[field.label] = v.errorMessage || "Invalid email";
//             return;
//           }
//           if (v?.format === "usPhone" && !usPhoneRegex.test(value)) {
//             errors[field.label] = v.errorMessage || "Invalid US phone number";
//             return;
//           }
//         });
//       } else {
//         // تک فیلد ساده
//         const value = (values["single"] || "").trim();
//         const v = questionData.validation;
//         if (v?.required && !value) errors["single"] = v.errorMessage || "This field is required";
//         else if (v?.minLength && value.length < v.minLength) errors["single"] = v.errorMessage || `Minimum ${v.minLength} characters required`;
//         else if (v?.pattern && !new RegExp(v.pattern).test(value)) errors["single"] = v.errorMessage || "Invalid format";
//       }
//       setErrorMessages(errors);
//       return Object.keys(errors).length === 0;
//     },
//     [questionData]
//   );

//   const handleChange = (label: string, value: string) => {
//     const newValues = { ...inputValues, [label]: value };
//     setInputValues(newValues);
//     if (validateInput(newValues)) {
//       setAnswer(questionData.id, newValues);
//     } else {
//       setAnswer(questionData.id, null);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       {(questionData.fields ?? [{ label: "single", placeholder: "" }]).map((field) => (
//         <div key={field.label} className="flex flex-col gap-1">
//           <input
//             type="text"
//             placeholder={field.placeholder || "Enter your answer"}
//             value={inputValues[field.label] || ""}
//             onChange={(e) => handleChange(field.label, e.target.value)}
//             className={`border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//               errorMessages[field.label] ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errorMessages[field.label] && (
//             <span className="text-red-500 text-sm">{errorMessages[field.label]}</span>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };


// "use client";

// import React, { useState, useCallback, useEffect } from "react";
// import { useAppStore } from "@/store/useAppStore";

// type Field = {
//   label: string;
//   placeholder?: string;
//   validation?: {
//     required?: boolean;
//     minLength?: number;
//     pattern?: string;
//     format?: "email" | "usPhone";
//     errorMessage?: string;
//   };
// };

// type QuestionData = {
//   id: string;
//   title?: string;
//   type: "text";
//   fields?: Field[]; // اگر وجود داشته باشه => multi-field
//   validation?: {
//     required?: boolean;
//     minLength?: number;
//     pattern?: string;
//     errorMessage?: string;
//   };
// };

// type Props = {
//   questionData: QuestionData;
//   selectedAnswer: string | string[];
//   setAnswer: (answer: string | string[]) => void;
//   isFirstQuiz?: boolean;
// };


// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const usPhoneRegex = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;

// export const TextInputQuestion: React.FC<Props> = ({ questionData, selectedAnswer, setAnswer, isFirstQuiz }) => {
//   // const setAnswer = useAppStore((s) => s.setAnswer);
//   const getAnswerForQuestion = useAppStore((s) => s.getAnswerForQuestion);

//   const [inputValues, setInputValues] = useState<Record<string, string>>({});
//   const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

//   // initialize from store (prefill) or with empty fields
//   useEffect(() => {
//     const stored = getAnswerForQuestion(questionData.id, Boolean(isFirstQuiz));
//     if (questionData.fields) {
//       // multi-field: expect stored to be Record<string,string>
//       if (stored && typeof stored === "object" && !Array.isArray(stored)) {
//         setInputValues(stored as Record<string, string>);
//       } else {
//         const init: Record<string, string> = {};
//         questionData.fields.forEach((f) => (init[f.label] = ""));
//         setInputValues(init);
//       }
//     } else {
//       // single field
//       if (stored && typeof stored === "string") {
//         setInputValues({ single: stored });
//       } else {
//         setInputValues({ single: "" });
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [questionData.id, questionData.fields]);

//   // validate single field (returns error string or null)
//   const validateField = useCallback((value: string, v?: Field["validation"]) => {
//     const trimmed = value.trim();
//     if (v?.required && !trimmed) return v.errorMessage || "This field is required";
//     if (v?.minLength && trimmed.length < v.minLength) return v.errorMessage || `Minimum ${v.minLength} characters required`;
//     if (v?.pattern && !new RegExp(v.pattern).test(trimmed)) return v.errorMessage || "Invalid format";
//     if (v?.format === "email" && !emailRegex.test(trimmed)) return v.errorMessage || "Invalid email";
//     if (v?.format === "usPhone" && !usPhoneRegex.test(trimmed)) return v.errorMessage || "Invalid US phone number";
//     return null;
//   }, []);

//   // validate all fields and return errors object
//   const validateAll = useCallback(
//     (values: Record<string, string>) => {
//       const errors: Record<string, string> = {};
//       if (questionData.fields) {
//         questionData.fields.forEach((field) => {
//           const err = validateField(values[field.label] || "", field.validation);
//           if (err) errors[field.label] = err;
//         });
//       } else {
//         const err = validateField(values["single"] || "", questionData.validation);
//         if (err) errors["single"] = err;
//       }
//       setErrorMessages(errors);
//       return errors;
//     },
//     [questionData, validateField]
//   );

//   // handle change: update local state, validate, then save or clear in store
//   const handleChange = useCallback(
//     (label: string, value: string) => {
//       setInputValues((prev) => {
//         const updated = { ...prev, [label]: value };
//         const errors = validateAll(updated);

//         const hasErrors = Object.keys(errors).length > 0;
//         // prepare answerValue to send to store (must match store expectations: AnswerValue)
//         if (!hasErrors) {
//           // if multi-field -> pass Record<string,string>, else pass string
//           if (questionData.fields) {
//             // cast: all field values as Record<string,string>
//             setAnswer(questionData as any, updated as any, Boolean(isFirstQuiz));
//           } else {
//             setAnswer(questionData as any, String(updated["single"] || ""), Boolean(isFirstQuiz));
//           }
//         } else {
//           // clear the answer in store: pass empty structure compatible with store types
//           if (questionData.fields) {
//             setAnswer(questionData as any, {} as Record<string, string>, Boolean(isFirstQuiz));
//           } else {
//             setAnswer(questionData as any, "" as string, Boolean(isFirstQuiz));
//           }
//         }

//         return updated;
//       });
//     },
//     [questionData, validateAll, setAnswer, isFirstQuiz]
//   );

//   const fieldsToRender = questionData.fields ?? [{ label: "single", placeholder: questionData?.validation?.errorMessage || "" }];

//   return (
//     <div className="flex flex-col gap-4">
//       {fieldsToRender.map((field) => {
//         const value = inputValues[field.label] ?? "";
//         return (
//           <div key={field.label} className="flex flex-col gap-1">
//             {/* <label className="text-sm font-medium">{field.label !== "single" ? field.label : questionData.title}</label> */}
//             <input
//               type="text"
//               placeholder={field.placeholder || ""}
//               value={value}
//               onChange={(e) => handleChange(field.label, e.target.value)}
//               className={`border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//                 errorMessages[field.label] ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errorMessages[field.label] && <span className="text-red-500 text-sm">{errorMessages[field.label]}</span>}
//           </div>
//         );
//       })}
//     </div>
//   );
// };


// "use client";

// import React, { useState, useCallback, useEffect } from "react";
// import { useAppStore } from "@/store/useAppStore";

// type Field = {
//   label: string;
//   placeholder?: string;
//   validation?: {
//     required?: boolean;
//     minLength?: number;
//     pattern?: string;
//     format?: "email" | "usPhone";
//     errorMessage?: string;
//   };
// };

// type QuestionData = {
//   id: string;
//   title?: string;
//   type: "text";
//   fields?: Field[]; // اگر وجود داشته باشه => multi-field
//   validation?: {
//     required?: boolean;
//     minLength?: number;
//     pattern?: string;
//     errorMessage?: string;
//   };
// };

// type Props = {
//   questionData: QuestionData;
//   selectedAnswer: string | string[];
//   setAnswer: (answer: string | string[]) => void;
//   isFirstQuiz?: boolean;
// };

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const usPhoneRegex = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;

// export const TextInputQuestion: React.FC<Props> = ({
//   questionData,
//   selectedAnswer,
//   setAnswer,
//   isFirstQuiz,
// }) => {
//   const getAnswerForQuestion = useAppStore((s) => s.getAnswerForQuestion);

//   const [inputValues, setInputValues] = useState<Record<string, string>>({});
//   const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

//   // initialize from selectedAnswer or store
//   useEffect(() => {
//     if (questionData.fields) {
//       // multi-field
//       const init: Record<string, string> = {};
//       questionData.fields.forEach((f, idx) => {
//         if (Array.isArray(selectedAnswer)) init[f.label] = selectedAnswer[idx] || "";
//         else init[f.label] = "";
//       });
//       setInputValues(init);
//     } else {
//       // single-field
//       if (typeof selectedAnswer === "string") setInputValues({ single: selectedAnswer });
//       else if (Array.isArray(selectedAnswer)) setInputValues({ single: selectedAnswer[0] || "" });
//       else setInputValues({ single: "" });
//     }
//   }, [questionData, selectedAnswer]);

//   // validate single field
//   const validateField = useCallback((value: string, v?: Field["validation"]) => {
//     const trimmed = value.trim();
//     if (v?.required && !trimmed) return v.errorMessage || "This field is required";
//     if (v?.minLength && trimmed.length < v.minLength)
//       return v.errorMessage || `Minimum ${v.minLength} characters required`;
//     if (v?.pattern && !new RegExp(v.pattern).test(trimmed)) return v.errorMessage || "Invalid format";
//     if (v?.format === "email" && !emailRegex.test(trimmed)) return v.errorMessage || "Invalid email";
//     if (v?.format === "usPhone" && !usPhoneRegex.test(trimmed))
//       return v.errorMessage || "Invalid US phone number";
//     return null;
//   }, []);

//   const validateAll = useCallback(
//     (values: Record<string, string>) => {
//       const errors: Record<string, string> = {};
//       if (questionData.fields) {
//         questionData.fields.forEach((field) => {
//           const err = validateField(values[field.label] || "", field.validation);
//           if (err) errors[field.label] = err;
//         });
//       } else {
//         const err = validateField(values["single"] || "", questionData.validation);
//         if (err) errors["single"] = err;
//       }
//       setErrorMessages(errors);
//       return errors;
//     },
//     [questionData, validateField]
//   );

//   const handleChange = useCallback(
//   (label: string, value: string) => {
//     setInputValues((prev) => {
//       const updated = { ...prev, [label]: value };
//       validateAll(updated); // فقط خطاها رو آپدیت کن

//       // جواب همیشه ذخیره بشه (حتی اگر خطا باشه)
//       if (questionData.fields) {
//         const arr = Object.values(updated);
//         setAnswer(arr);
//       } else {
//         setAnswer(updated["single"] || "");
//       }

//       return updated;
//     });
//   },
//   [questionData, validateAll, setAnswer]
// );


//   const fieldsToRender = questionData.fields ?? [{ label: "single", placeholder: questionData?.validation?.errorMessage || "" }];

//   return (
//     <div className="flex flex-col gap-4">
//       {fieldsToRender.map((field) => {
//         const value = inputValues[field.label] ?? "";
//         return (
//           <div key={field.label} className="flex flex-col gap-1">
//             <input
//               type="text"
//               placeholder={field.placeholder || ""}
//               value={value}
//               onChange={(e) => handleChange(field.label, e.target.value)}
//               className={`border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//                 errorMessages[field.label] ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errorMessages[field.label] && (
//               <span className="text-red-500 text-sm">{errorMessages[field.label]}</span>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };


// "use client";

// import { useState, useEffect, useCallback, useRef, useMemo } from "react";
// import { QuestionItem, AnswerValue } from "@/store/useAppStore";

// interface Props {
//   question: QuestionItem;
//   selectedAnswer: string | string[] | null;
//   setAnswer: (
//     question: QuestionItem,
//     answer: AnswerValue,
//     isFirstQuiz: boolean
//   ) => void;
//   isFirstQuiz: boolean;
//   onValidationChange?: (isValid: boolean) => void; // اضافه: اعلام اعتبار به والد
// }

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const usPhoneRegex = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;

// export const TextInputQuestion = ({
//   question,
//   selectedAnswer,
//   setAnswer,
//   isFirstQuiz,
//   onValidationChange,
// }: Props) => {
//   const [inputValues, setInputValues] = useState<Record<string, string>>({});
//   const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
//   const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

//   // مقدار اولیه
//   useEffect(() => {
//     if (question.fields && question.fields.length > 0) {
//       const init: Record<string, string> = {};
//       question.fields.forEach((f, idx) => {
//         if (Array.isArray(selectedAnswer)) init[f.label] = selectedAnswer[idx] || "";
//         else init[f.label] = "";
//       });
//       setInputValues(init);
//     } else {
//       if (typeof selectedAnswer === "string") setInputValues({ single: selectedAnswer });
//       else if (Array.isArray(selectedAnswer)) setInputValues({ single: selectedAnswer[0] || "" });
//       else setInputValues({ single: "" });
//     }
//   }, [question, selectedAnswer]);

//   const validateField = useCallback((value: string, validation?: any) => {
//     const trimmed = value.trim();
//     if (validation?.required && !trimmed) return validation.errorMessage || "This field is required";
//     if (validation?.minLength && trimmed.length < validation.minLength)
//       return validation.errorMessage || `Minimum ${validation.minLength} characters required`;
//     if (validation?.pattern && !new RegExp(validation.pattern).test(trimmed))
//       return validation.errorMessage || "Invalid format";
//     if (validation?.format === "email" && !emailRegex.test(trimmed))
//       return validation.errorMessage || "Invalid email";
//     if (validation?.format === "usPhone" && !usPhoneRegex.test(trimmed))
//       return validation.errorMessage || "Invalid US phone number";
//     return null;
//   }, []);

//   const validateAll = useCallback(
//     (values: Record<string, string>) => {
//       const errors: Record<string, string> = {};
//       if (question.fields && question.fields.length > 0) {
//         question.fields.forEach((field) => {
//           const err = validateField(values[field.label] || "", field.validation);
//           if (err) errors[field.label] = err;
//         });
//       } else {
//         const err = validateField(values["single"] || "", question.validation);
//         if (err) errors["single"] = err;
//       }
//       setErrorMessages(errors);
//       return errors;
//     },
//     [question, validateField]
//   );

//   // چک کن آیا همه فیلدها معتبرند
//   const isValid = useMemo(() => Object.keys(errorMessages).length === 0 && Object.values(inputValues).every(v => v.trim() !== ""), [errorMessages, inputValues]);

//   // اعلام اعتبار به والد
//   useEffect(() => {
//     if (onValidationChange) onValidationChange(isValid);
//   }, [isValid, onValidationChange]);

//   const handleChange = useCallback(
//     (label: string, value: string) => {
//       setInputValues((prev) => {
//         const updated = { ...prev, [label]: value };
//         validateAll(updated);

//         if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
//         debounceTimeout.current = setTimeout(() => {
//           if (question.fields && question.fields.length > 0) {
//             const arr = Object.values(updated);
//             setAnswer(question, arr, isFirstQuiz);
//           } else {
//             setAnswer(question, updated["single"] || "", isFirstQuiz);
//           }
//         }, 300);

//         return updated;
//       });
//     },
//     [question, isFirstQuiz, setAnswer, validateAll]
//   );

//   const fieldsToRender =
//     question.fields && question.fields.length > 0
//       ? question.fields
//       : [{ label: "single", placeholder: question.placeholder || "" }];

//   return (
//     <div className="flex flex-col gap-4">
//       {fieldsToRender.map((field) => {
//         const value = inputValues[field.label] ?? "";
//         return (
//           <div key={field.label} className="flex flex-col gap-1">
//             <input
//               type="text"
//               placeholder={field.placeholder || ""}
//               value={value}
//               onChange={(e) => handleChange(field.label, e.target.value)}
//               className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//                 errorMessages[field.label] ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errorMessages[field.label] && (
//               <span className="text-red-500 text-sm">{errorMessages[field.label]}</span>
//             )}
//             {field.hint && !errorMessages[field.label] && (
//               <p className="text-sm text-gray-500">{field.hint}</p>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };


// "use client";

// import { useState, useEffect, useCallback, useRef, useMemo } from "react";
// import { QuestionItem, AnswerValue } from "@/store/useAppStore";

// interface Props {
//   question: QuestionItem;
//   selectedAnswer: AnswerValue | null;
//   setAnswer: (
//     question: QuestionItem,
//     answer: AnswerValue,
//     isFirstQuiz: boolean
//   ) => void;
//   isFirstQuiz: boolean;
//   onValidationChange?: (isValid: boolean) => void; // اضافه: اعلام اعتبار به والد
// }

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
// const usPhoneRegex = /^(?:\+1\s?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;

// export const TextInputQuestion = ({
//   question,
//   selectedAnswer,
//   setAnswer,
//   isFirstQuiz,
//   onValidationChange,
// }: Props) => {
//   const [inputValues, setInputValues] = useState<Record<string, string>>({});
//   const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
//   const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

//   // مقدار اولیه
//   useEffect(() => {
//     if (question.fields && question.fields.length > 0) {
//       const init: Record<string, string> = {};
//       if (typeof selectedAnswer === "object" && !Array.isArray(selectedAnswer) && selectedAnswer !== null) {
//         // اگر Record<string, string> است
//         question.fields.forEach((f) => {
//           init[f.label] = (selectedAnswer as Record<string, string>)[f.label] || "";
//         });
//       } else if (Array.isArray(selectedAnswer)) {
//         // fallback: اگر array است، بر اساس index
//         question.fields.forEach((f, idx) => {
//           init[f.label] = selectedAnswer[idx] || "";
//         });
//       } else {
//         // خالی
//         question.fields.forEach((f) => {
//           init[f.label] = "";
//         });
//       }
//       setInputValues(init);
//     } else {
//       // single field
//       const singleValue = typeof selectedAnswer === "string" 
//         ? selectedAnswer 
//         : Array.isArray(selectedAnswer) 
//         ? selectedAnswer.join(", ") 
//         : "";
//       setInputValues({ single: singleValue });
//     }
//   }, [question, selectedAnswer]);

//   const validateField = useCallback((value: string, validation?: any) => {
//     const trimmed = value.trim();
//     if (validation?.required && !trimmed) return validation.errorMessage || "This field is required";
//     if (validation?.minLength && trimmed.length < validation.minLength)
//       return validation.errorMessage || `Minimum ${validation.minLength} characters required`;
//     if (validation?.pattern && !new RegExp(validation.pattern).test(trimmed))
//       return validation.errorMessage || "Invalid format";
//     if (validation?.format === "email" && !emailRegex.test(trimmed))
//       return validation.errorMessage || "Invalid email";
//     if (validation?.format === "usPhone" && !usPhoneRegex.test(trimmed))
//       return validation.errorMessage || "Invalid US phone number";
//     if (validation?.min !== undefined && Number(trimmed) < validation.min)
//       return validation.errorMessage || `Minimum ${validation.min} required`;
//     if (validation?.max !== undefined && Number(trimmed) > validation.max)
//       return validation.errorMessage || `Maximum ${validation.max} required`;
//     return null;
//   }, []);

//   const validateAll = useCallback(
//     (values: Record<string, string>) => {
//       const errors: Record<string, string> = {};
//       if (question.fields && question.fields.length > 0) {
//         question.fields.forEach((field) => {
//           const err = validateField(values[field.label] || "", field.validation);
//           if (err) errors[field.label] = err;
//         });
//       } else {
//         const err = validateField(values["single"] || "", question.validation);
//         if (err) errors["single"] = err;
//       }
//       setErrorMessages(errors);
//       return errors;
//     },
//     [question, validateField]
//   );

//   // چک کن آیا همه فیلدها معتبرند
//   const isValid = useMemo(() => {
//     const hasErrors = Object.keys(errorMessages).length > 0;
//     const hasEmptyRequired = question.fields 
//       ? question.fields.some(f => f.validation?.required && !inputValues[f.label]?.trim())
//       : question.validation?.required && !inputValues["single"]?.trim();
//     return !hasErrors && !hasEmptyRequired;
//   }, [errorMessages, inputValues, question]);

//   // اعلام اعتبار به والد
//   useEffect(() => {
//     if (onValidationChange) onValidationChange(isValid);
//   }, [isValid, onValidationChange]);

//   const handleChange = useCallback(
//     (label: string, value: string) => {
//       setInputValues((prev) => {
//         const updated = { ...prev, [label]: value };
//         validateAll(updated);

//         if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
//         debounceTimeout.current = setTimeout(() => {
//           if (question.fields && question.fields.length > 0) {
//             // برای multi-field، Record را پاس کن (نه array)
//             const answerRecord = { ...updated };
//             // حذف single اگر وجود دارد
//             delete answerRecord["single"];
//             setAnswer(question, answerRecord, isFirstQuiz);
//           } else {
//             setAnswer(question, updated["single"] || "", isFirstQuiz);
//           }
//         }, 300);

//         return updated;
//       });
//     },
//     [question, isFirstQuiz, setAnswer, validateAll]
//   );

//   const fieldsToRender =
//     question.fields && question.fields.length > 0
//       ? question.fields
//       : [{ label: "single", placeholder: question.placeholder || "" }];

//   return (
//     <div className="flex flex-col gap-4">
//       {fieldsToRender.map((field) => {
//         const value = inputValues[field.label] ?? "";
//         return (
//           <div key={field.label} className="flex flex-col gap-1">
//             <input
//               type="text"
//               placeholder={field.placeholder || ""}
//               value={value}
//               onChange={(e) => handleChange(field.label, e.target.value)}
//               className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//                 errorMessages[field.label] ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errorMessages[field.label] && (
//               <span className="text-red-500 text-sm">{errorMessages[field.label]}</span>
//             )}
//             {field.hint && !errorMessages[field.label] && (
//               <p className="text-sm text-gray-500">{field.hint}</p>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };


// "use client";

// import { useState, useEffect, useCallback, useRef, useMemo } from "react";
// import { QuestionItem, AnswerValue } from "@/store/useAppStore";

// interface Props {
//   question: QuestionItem;
//   selectedAnswer: AnswerValue | null;
//   setAnswer: (
//     question: QuestionItem,
//     answer: AnswerValue,
//     isFirstQuiz: boolean
//   ) => void;
//   isFirstQuiz: boolean;
//   onValidationChange?: (isValid: boolean) => void; // اضافه: اعلام اعتبار به والد
// }

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
// const usPhoneRegex = /^(?:\+1\s?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;

// export const TextInputQuestion = ({
//   question,
//   selectedAnswer,
//   setAnswer,
//   isFirstQuiz,
//   onValidationChange,
// }: Props) => {
//   const [inputValues, setInputValues] = useState<Record<string, string>>({});
//   const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
//   const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

//   // مقدار اولیه
//   useEffect(() => {
//     if (question.fields && question.fields.length > 0) {
//       const init: Record<string, string> = {};
//       if (typeof selectedAnswer === "object" && !Array.isArray(selectedAnswer) && selectedAnswer !== null) {
//         // اگر Record<string, string> است
//         question.fields.forEach((f) => {
//           init[f.label] = (selectedAnswer as Record<string, string>)[f.label] || "";
//         });
//       } else if (Array.isArray(selectedAnswer)) {
//         // fallback: اگر array است، بر اساس index
//         question.fields.forEach((f, idx) => {
//           init[f.label] = selectedAnswer[idx] || "";
//         });
//       } else {
//         // خالی
//         question.fields.forEach((f) => {
//           init[f.label] = "";
//         });
//       }
//       setInputValues(init);
//     } else {
//       // single field
//       const singleValue = typeof selectedAnswer === "string" 
//         ? selectedAnswer 
//         : Array.isArray(selectedAnswer) 
//         ? selectedAnswer.join(", ") 
//         : "";
//       setInputValues({ single: singleValue });
//     }
//   }, [question, selectedAnswer]);

//   const validateField = useCallback((value: string, validation?: any) => {
//     const trimmed = value.trim();
//     if (validation?.required && !trimmed) return validation.errorMessage || "This field is required";
//     if (validation?.minLength && trimmed.length < validation.minLength)
//       return validation.errorMessage || `Minimum ${validation.minLength} characters required`;
//     if (validation?.pattern && !new RegExp(validation.pattern).test(trimmed))
//       return validation.errorMessage || "Invalid format";
//     if (validation?.format === "email" && !emailRegex.test(trimmed))
//       return validation.errorMessage || "Invalid email";
//     if (validation?.format === "usPhone" && !usPhoneRegex.test(trimmed))
//       return validation.errorMessage || "Invalid US phone number";
//     if (validation?.min !== undefined && Number(trimmed) < validation.min)
//       return validation.errorMessage || `Minimum ${validation.min} required`;
//     if (validation?.max !== undefined && Number(trimmed) > validation.max)
//       return validation.errorMessage || `Maximum ${validation.max} required`;
//     return null;
//   }, []);

//   const validateAll = useCallback(
//     (values: Record<string, string>) => {
//       const errors: Record<string, string> = {};
//       if (question.fields && question.fields.length > 0) {
//         question.fields.forEach((field) => {
//           const err = validateField(values[field.label] || "", field.validation);
//           if (err) errors[field.label] = err;
//         });
//       } else {
//         const err = validateField(values["single"] || "", question.validation);
//         if (err) errors["single"] = err;
//       }
//       setErrorMessages(errors);
//       return errors;
//     },
//     [question, validateField]
//   );

//   // چک کن آیا همه فیلدها معتبرند
//   const isValid = useMemo(() => {
//     const hasErrors = Object.keys(errorMessages).length > 0;
//     const hasEmptyRequired = question.fields 
//       ? question.fields.some(f => f.validation?.required && !inputValues[f.label]?.trim())
//       : question.validation?.required && !inputValues["single"]?.trim();
//     return !hasErrors && !hasEmptyRequired;
//   }, [errorMessages, inputValues, question]);

//   // اعلام اعتبار به والد
//   useEffect(() => {
//     if (onValidationChange) onValidationChange(isValid);
//   }, [isValid, onValidationChange]);

//   const handleChange = useCallback(
//     (label: string, value: string) => {
//       setInputValues((prev) => {
//         const updated = { ...prev, [label]: value };
//         validateAll(updated);

//         if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
//         debounceTimeout.current = setTimeout(() => {
//           if (question.fields && question.fields.length > 0) {
//             // برای multi-field، Record را پاس کن (نه array)
//             const answerRecord = { ...updated };
//             // حذف single اگر وجود دارد
//             delete answerRecord["single"];
//             setAnswer(question, answerRecord, isFirstQuiz);
//           } else {
//             setAnswer(question, updated["single"] || "", isFirstQuiz);
//           }
//         }, 300);

//         return updated;
//       });
//     },
//     [question, isFirstQuiz, setAnswer, validateAll]
//   );

//   const fieldsToRender =
//     question.fields && question.fields.length > 0
//       ? question.fields
//       : [{ label: "single", placeholder: question.placeholder || "" }];

//   return (
//     <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
//       {fieldsToRender.map((field) => {
//         const value = inputValues[field.label] ?? "";
//         return (
//           <div key={field.label} className="min-w-1/2 flex flex-col gap-1">
//             <input
//               type="text"
//               placeholder={field.placeholder || ""}
//               value={value}
//               onChange={(e) => handleChange(field.label, e.target.value)}
//               className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-black ${
//                 errorMessages[field.label] ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errorMessages[field.label] && (
//               <span className="text-red-500 text-sm">{errorMessages[field.label]}</span>
//             )}
//             {field.hint && !errorMessages[field.label] && (
//               <p className="text-sm text-gray-500">{field.hint}</p>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { QuestionItem, AnswerValue } from "@/store/useAppStore";

interface Props {
  question: QuestionItem;
  selectedAnswer: AnswerValue | null;
  setAnswer: (
    question: QuestionItem,
    answer: AnswerValue,
    isFirstQuiz: boolean
  ) => void;
  isFirstQuiz: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const usPhoneRegex =
  /^(?:\+1\s?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;

export const TextInputQuestion = ({
  question,
  selectedAnswer,
  setAnswer,
  isFirstQuiz,
  onValidationChange,
}: Props) => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // مقدار اولیه
  useEffect(() => {
    if (question.fields && question.fields.length > 0) {
      const init: Record<string, string> = {};
      if (
        typeof selectedAnswer === "object" &&
        !Array.isArray(selectedAnswer) &&
        selectedAnswer !== null
      ) {
        question.fields.forEach((f) => {
          init[f.label] =
            (selectedAnswer as Record<string, string>)[f.label] || "";
        });
      } else {
        question.fields.forEach((f) => {
          init[f.label] = "";
        });
      }
      setInputValues(init);
    } else {
      const singleValue =
        typeof selectedAnswer === "string" ? selectedAnswer : "";
      setInputValues({ single: singleValue });
    }
  }, [question, selectedAnswer]);

  // اعتبارسنجی هر فیلد
  const validateField = useCallback((value: string, validation?: any) => {
    const trimmed = value.trim();

    // خالی بودن
    if (!trimmed) {
      if (validation?.required) {
        return validation.errorMessage || "This field is required";
      }
      return null;
    }

    if (validation?.minLength && trimmed.length < validation.minLength) {
      return (
        validation.errorMessage ||
        `Minimum ${validation.minLength} characters required`
      );
    }

    if (validation?.pattern && !new RegExp(validation.pattern).test(trimmed)) {
      return validation.errorMessage || "Invalid format";
    }

    if (validation?.format === "email" && !emailRegex.test(trimmed)) {
      return validation.errorMessage || "Invalid email";
    }

    if (validation?.format === "usPhone" && !usPhoneRegex.test(trimmed)) {
      return validation.errorMessage || "Invalid US phone number";
    }

    if (validation?.min !== undefined && Number(trimmed) < validation.min) {
      return (
        validation.errorMessage || `Minimum ${validation.min} required`
      );
    }

    if (validation?.max !== undefined && Number(trimmed) > validation.max) {
      return (
        validation.errorMessage || `Maximum ${validation.max} required`
      );
    }

    return null;
  }, []);

  // اعتبارسنجی همه‌ی فیلدها
  const validateAll = useCallback(
    (values: Record<string, string>) => {
      const errors: Record<string, string> = {};
      if (question.fields && question.fields.length > 0) {
        question.fields.forEach((field) => {
          const err = validateField(
            values[field.label] || "",
            field.validation
          );
          if (err) errors[field.label] = err;
        });
      } else {
        const err = validateField(
          values["single"] || "",
          question.validation
        );
        if (err) errors["single"] = err;
      }
      setErrorMessages(errors);
      return errors;
    },
    [question, validateField]
  );

  // معتبر بودن همه فیلدها
  const isValid = useMemo(() => {
    const hasErrors = Object.keys(errorMessages).length > 0;
    const hasEmptyRequired = question.fields
      ? question.fields.some(
          (f) =>
            f.validation?.required && !inputValues[f.label]?.trim()
        )
      : question.validation?.required && !inputValues["single"]?.trim();
    return !hasErrors && !hasEmptyRequired;
  }, [errorMessages, inputValues, question]);

  // ارسال اعتبار به والد
  useEffect(() => {
    if (onValidationChange) onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  // تغییر مقدار اینپوت
  const handleChange = useCallback(
    (label: string, value: string) => {
      setInputValues((prev) => {
        const updated = { ...prev, [label]: value };
        validateAll(updated);

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
          if (question.fields && question.fields.length > 0) {
            const answerRecord = { ...updated };
            delete answerRecord["single"];
            setAnswer(question, answerRecord, isFirstQuiz);
          } else {
            setAnswer(question, updated["single"] || "", isFirstQuiz);
          }
        }, 300);

        return updated;
      });
    },
    [question, isFirstQuiz, setAnswer, validateAll]
  );

  const fieldsToRender =
    question.fields && question.fields.length > 0
      ? question.fields
      : [{ label: "single", placeholder: question.placeholder || "" }];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {fieldsToRender.map((field) => {
        const value = inputValues[field.label] ?? "";
        return (
          <div key={field.label} className="min-w-1/2 flex flex-col gap-1">
            <input
              type="text"
              placeholder={field.placeholder || ""}
              value={value}
              onChange={(e) => handleChange(field.label, e.target.value)}
              className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-black ${
                errorMessages[field.label]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errorMessages[field.label] && (
              <span className="text-red-500 text-sm">
                {errorMessages[field.label]}
              </span>
            )}
            {field.hint && !errorMessages[field.label] && (
              <p className="text-sm text-gray-500">{field.hint}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};
