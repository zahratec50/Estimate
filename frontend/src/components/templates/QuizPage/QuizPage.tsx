"use client";

import { useAppStore } from "@/store/useAppStore";
import { useMemo, useState, useEffect } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import clsx from "clsx";
import firstQuestion from "@/data/firstQuestion.json";
import states from "@/data/states.json";
import CustomSelect from "@/components/modules/CustomSelect/CustomSelect";

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
      state.preQuizAnswers.find((a) => a.question === questionText)?.answer ??
      null
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
      className={`w-full ${
        isHelpOpen ? "max-w-[800px]" : "max-w-full"
      } font-roboto px-4 sm:px-0`}
    >
      <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-black-50 mb-10 dark:text-white">
        {questionData.question}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:pb-[80px]">
        {questionData.answers && questionData.answers.length > 0 ? (
          questionData.answers[0] === "City and state dropdown" ? (
            <div className="col-span-full flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="w-full md:w-1/2">

                <CustomSelect
                  options={Object.keys(states.countries.USA)}
                  value={selectedState}
                  onChange={handleStateChange}
                  placeholder="Select a state"
                  name="state list"
                />
              </div>

              <div className="w-full md:w-1/2">
                <CustomSelect
                  options={
                    selectedState ? states.countries.USA[selectedState] : []
                  }
                  value={selectedCity}
                  onChange={handleCityChange}
                  placeholder="Select a city"
                  disabled={!selectedState}
                  name="city list"
                />
              </div>
            </div>
          ) : questionData.answers[0] === "Text input" ? (
            <div className="col-span-full md:w-1/2 flex">
              <input
                type="text"
                placeholder="Email or Phone Number"
                className="w-full border p-2 rounded-lg outline-primary-500"
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
                    "relative p-6 rounded-lg border transition-all duration-200 text-left",
                    {
                      "border-primary-500 bg-primary-50 dark:border-secondary-500 dark:bg-secondary-800 shadow-lg":
                        isSelected,
                      "border-neutral-300 hover:bg-primary-50 dark:border-secondary-500 dark:hover:bg-secondary-800 dark:bg-secondary-900":
                        !isSelected,
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
          <div className="text-red-500 dark:text-red-300">
            Invalid question format.
          </div>
        )}
      </div>
    </div>
  );
}
