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
              className={`border rounded-md px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-secondary-700 dark:border-none ${
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
