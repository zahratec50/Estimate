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
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // مقدار اولیه
  useEffect(() => {
    const initValues: Record<string, string> = {};
    const initTouched: Record<string, boolean> = {};

    if (question.fields && question.fields.length > 0) {
      question.fields.forEach((f) => {
        initValues[f.label] =
          (selectedAnswer as Record<string, string>)?.[f.label] || "";
        initTouched[f.label] = false;
      });
    } else {
      const singleValue =
        typeof selectedAnswer === "string" ? selectedAnswer : "";
      initValues["single"] = singleValue;
      initTouched["single"] = false;
    }

    setInputValues(initValues);
    setTouchedFields(initTouched);
    setErrorMessages({}); // ریست ارورها
  }, [question, selectedAnswer]);

  // اعتبارسنجی یک فیلد
  const validateField = useCallback((value: string, validation?: any) => {
    const trimmed = value.trim();
    if (!trimmed) {
      if (validation?.required) return validation.errorMessage || "This field is required";
      return null;
    }
    if (validation?.minLength && trimmed.length < validation.minLength)
      return validation.errorMessage || `Minimum ${validation.minLength} characters required`;
    if (validation?.pattern && !new RegExp(validation.pattern).test(trimmed))
      return validation.errorMessage || "Invalid format";
    if (validation?.format === "email" && !emailRegex.test(trimmed))
      return validation.errorMessage || "Invalid email";
    if (validation?.format === "usPhone" && !usPhoneRegex.test(trimmed))
      return validation.errorMessage || "Invalid US phone number";
    if (validation?.min !== undefined && Number(trimmed) < validation.min)
      return validation.errorMessage || `Minimum ${validation.min} required`;
    if (validation?.max !== undefined && Number(trimmed) > validation.max)
      return validation.errorMessage || `Maximum ${validation.max} required`;
    return null;
  }, []);

  // معتبر بودن فرم بدون تغییر state در render
  const isValid = useMemo(() => {
    const hasErrors = Object.values(errorMessages).some((e) => e && e.length > 0);

    const hasEmptyRequired = question.fields
      ? question.fields.some(
          (f) =>
            f.validation?.required &&
            touchedFields[f.label] &&
            !inputValues[f.label]?.trim()
        )
      : question.validation?.required &&
        touchedFields["single"] &&
        !inputValues["single"]?.trim();

    return !hasErrors && !hasEmptyRequired;
  }, [errorMessages, inputValues, touchedFields, question]);

  // ارسال اعتبار به والد
  useEffect(() => {
    if (onValidationChange) onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  // تغییر مقدار اینپوت با debounce و اعتبارسنجی فیلد
  const handleChange = useCallback(
    (label: string, value: string) => {
      setInputValues(prev => {
        const updated = { ...prev, [label]: value };

        // اعتبارسنجی فقط روی همین فیلد
        const validation = question.fields?.find(f => f.label === label)?.validation || question.validation;
        const err = validateField(value, validation);
        setErrorMessages(prevErr => ({ ...prevErr, [label]: err || "" }));

        // debounce برای auto-save
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
    [question, isFirstQuiz, setAnswer, validateField]
  );

  // وقتی کاربر روی فیلد blur می‌کنه، تگ touched true میشه و اعتبارسنجی انجام می‌شود
  const handleBlur = (label: string) => {
    setTouchedFields(prev => ({ ...prev, [label]: true }));

    const validation = question.fields?.find(f => f.label === label)?.validation || question.validation;
    const err = validateField(inputValues[label], validation);
    setErrorMessages(prevErr => ({ ...prevErr, [label]: err || "" }));
  };

  const fieldsToRender = question.fields && question.fields.length > 0
    ? question.fields
    : [{ label: "single", placeholder: question.placeholder || "" }];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {fieldsToRender.map(field => {
        const value = inputValues[field.label] ?? "";
        const showError = touchedFields[field.label] && errorMessages[field.label];
        return (
          <div key={field.label} className="flex flex-col gap-1">
            <input
              type="text"
              placeholder={field.placeholder || ""}
              value={value}
              onChange={e => handleChange(field.label, e.target.value)}
              onBlur={() => handleBlur(field.label)}
              className={`border rounded-md px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-secondary-700 dark:border-none ${
                showError ? "border-red-500" : "border-gray-300"
              }`}
            />
            {showError && (
              <span className="text-red-500 text-sm">{errorMessages[field.label]}</span>
            )}
            {field.hint && !showError && (
              <p className="text-sm text-gray-500">{field.hint}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};
