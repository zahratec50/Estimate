"use client";

import { useAppStore } from "@/store/useAppStore";
import firstQuestion from "@/data/firstQuestion.json";
import states from "@/data/states.json";
import { useState, useEffect, useCallback } from "react";
import CustomSelect from "../../../modules/CustomSelect/CustomSelect";
import { motion, AnimatePresence } from "framer-motion";
import { CiEdit } from "react-icons/ci";

interface CityStateAnswer {
  state: string;
  city: string;
}

export const EditableFirstQuiz = () => {
  const preQuizAnswers = useAppStore((state) => state.preQuizAnswers);
  const setAnswer = useAppStore((state) => state.setAnswer);

  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  useEffect(() => {
    const initial: { [key: string]: any } = {};
    firstQuestion.forEach((q) => {
      const existing = preQuizAnswers.find((a) => a.question === q.title);
      initial[q.title] = existing?.answer || "";

      if (q.type === "select") {
        const existingAnswer = existing?.answer as CityStateAnswer | undefined;
        if (existingAnswer) {
          setSelectedState(existingAnswer.state);
          setSelectedCity(existingAnswer.city);
        }
      }
    });
    setAnswers(initial);
  }, [preQuizAnswers]);

  const handleChange = useCallback((question: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  }, []);

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedCity("");
    handleChange("Which city and state do you live or work in?", {
      state,
      city: "",
    } as CityStateAnswer);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    handleChange("Which city and state do you live or work in?", {
      state: selectedState,
      city,
    } as CityStateAnswer);
  };

  const handleSave = useCallback(() => {
    firstQuestion.forEach((q) => {
      const value = answers[q.title];
      setAnswer(q, value, true);
    });
    setIsEditing(false);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  }, [answers, setAnswer]);

  const handleCancel = () => {
    const resetAnswers: { [key: string]: any } = {};
    firstQuestion.forEach((q) => {
      const existing = preQuizAnswers.find((a) => a.question === q.title);
      resetAnswers[q.title] = existing?.answer || "";

      if (q.type === "select") {
        const existingAnswer = existing?.answer as CityStateAnswer | undefined;
        if (existingAnswer) {
          setSelectedState(existingAnswer.state);
          setSelectedCity(existingAnswer.city);
        } else {
          setSelectedState("");
          setSelectedCity("");
        }
      }
    });
    setAnswers(resetAnswers);
    setIsEditing(false);
  };

  // تابع کمکی برای نمایش پاسخ‌ها با هر فیلد در خط جدا
  const renderAnswer = (answer: any, type: string) => {
    if (answer === null || answer === undefined || answer === "")
      return "Not answered yet";

    if (type === "select") {
      if (typeof answer === "string") {
        // اگر رشته شامل "-" است، همان را نمایش بده
        return answer;
      }
      return answer.state && answer.city
        ? `${answer.city} - ${answer.state}` // ساختار مورد نظر
        : "Not answered yet";
    }

    if (type === "text" || type === "button") {
      if (typeof answer === "object" && !Array.isArray(answer)) {
        return (
          <div className="flex flex-col gap-1">
            {Object.entries(answer).map(([key, value]) => (
              <div key={key}>
                <span className="font-semibold">{key}:</span> {String(value)}
              </div>
            ))}
          </div>
        );
      }

      if (Array.isArray(answer)) {
        return (
          <div className="flex flex-col gap-1">
            {answer.map((a, i) => (
              <div key={i}>{a}</div>
            ))}
          </div>
        );
      }

      if (typeof answer === "string") return answer; // رشته ساده را نمایش بده

      return String(answer); // fallback
    }

    return String(answer);
  };

  return (
    <div className="relative space-y-6 mb-8 p-4 dark:bg-secondary-900">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your First Quiz Answers</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            aria-label="Edit"
            className="text-sm font-medium text-primary-500 hover:underline"
          >
            <CiEdit className="size-6 dark:text-white" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {firstQuestion.map((q) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full p-4 border rounded-md border-gray-200 dark:border-secondary-700 mb-3"
          >
            <label className="font-medium mb-2 block">{q.title}</label>

            {!isEditing ? (
              <div className="w-fit text-gray-700 dark:text-gray-300 p-2 rounded-md bg-gray-100 dark:bg-secondary-800">
                {renderAnswer(answers[q.title], q.type)}
              </div>
            ) : q.type === "button" ? (
              <CustomSelect
                options={q.options as string[]}
                value={answers[q.title] || ""}
                onChange={(val) => handleChange(q.title, val)}
                placeholder="Select an option"
              />
            ) : q.type === "select" ? (
              <>
                <CustomSelect
                  options={Object.keys(states.countries.USA)}
                  value={selectedState}
                  onChange={handleStateChange}
                  placeholder="Select a state"
                  name="State"
                />
                {selectedState && (
                  <CustomSelect
                    options={
                      states.countries.USA[
                        selectedState as keyof typeof states.countries.USA
                      ] || []
                    }
                    value={selectedCity}
                    onChange={handleCityChange}
                    placeholder="Select a city"
                    name="City"
                  />
                )}
              </>
            ) : q.type === "text" ? (
              q.fields?.map((f) => (
                <input
                  key={f.label}
                  type="text"
                  placeholder={f.placeholder}
                  value={answers[q.title]?.[f.label] || ""}
                  onChange={(e) =>
                    handleChange(q.title, {
                      ...answers[q.title],
                      [f.label]: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded-md mb-2 border border-gray-300 dark:border-secondary-700 dark:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                />
              ))
            ) : null}
          </motion.div>
        ))}
      </AnimatePresence>

      {isEditing && (
        <div className="flex gap-4 justify-end">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-secondary-700 dark:hover:bg-secondary-800 text-gray-700 dark:text-gray-200 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-primary-400 text-white hover:bg-primary-500 transition"
          >
            Save
          </button>
        </div>
      )}

      {/* Toast for saved confirmation */}
      <AnimatePresence>
        {showSavedToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            Saved successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
