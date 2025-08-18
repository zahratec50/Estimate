"use client";

import { useAppStore } from "@/store/useAppStore";
import firstQuestion from "@/data/firstQuestion.json";
import states from "@/data/states.json";
import { useState, useEffect, useCallback } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";

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
    setSelectedCity(""); // reset city
    handleChange(
      "Which city and state do you live or work in?",
      { state, city: "" } as CityStateAnswer
    );
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    handleChange(
      "Which city and state do you live or work in?",
      { state: selectedState, city } as CityStateAnswer
    );
  };

  const handleSave = useCallback(() => {
    firstQuestion.forEach((q) => {
      const value = answers[q.title];
      setAnswer(q, value, true); // true = isFirstQuiz
    });
  }, [answers, setAnswer]);

  return (
    <div className="space-y-4 mb-8">
      {firstQuestion.map((q) => (
        <div key={q.id} className="w-full">
          <label className="font-medium mb-1 block">{q.title}</label>

          {q.type === "single-choice" || q.type === "multi-choice" ? (
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
          ) : q.type === "text-input" ? (
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
                className="w-full border p-2 rounded-md mb-2"
              />
            ))
          ) : null}
        </div>
      ))}

      <button
        onClick={handleSave}
        className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-400 transition"
      >
        Save Changes
      </button>
    </div>
  );
};
