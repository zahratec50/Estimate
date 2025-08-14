import { useState, useEffect } from "react";
import states from "@/data/states.json";
import CustomSelect from "@/components/templates/CustomSelect/CustomSelect";

interface QuestionItem {
  id: number;
  type: "single-choice" | "multi-choice" | "select" | "text-input";
  title: string;
  options: string[];
  multiple?: boolean;
  validation: {
    required: boolean;
    errorMessage: string;
    minSelected?: number;
    maxSelected?: number;
    pattern?: string;
  };
}

interface SelectQuestionProps {
  questionData: QuestionItem;
  selectedAnswer: string | string[] | null;
  setAnswer: (answer: string | string[]) => void;
}

export default function SelectQuestion({
  questionData,
  selectedAnswer,
  setAnswer,
}: SelectQuestionProps) {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  useEffect(() => {
    if (questionData.type === "select" && selectedAnswer) {
      const answer = typeof selectedAnswer === "string" ? selectedAnswer : "";
      const parts = answer.split(" - ");
      setSelectedState(parts[0] || "");
      setSelectedCity(parts[1] || "");
    } else {
      setSelectedState("");
      setSelectedCity("");
    }
  }, [selectedAnswer, questionData]);

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    setSelectedCity("");
  };

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    if (selectedState && cityName) {
      setAnswer(`${selectedState} - ${cityName}`);
    }
  };

  return (
    <div className="col-span-full flex flex-col md:flex-row items-center justify-between gap-4 mt-4 sm:pb-[80px]">
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
            selectedState
              ? states.countries.USA[
                  selectedState as keyof typeof states.countries.USA
                ]
              : []
          }
          value={selectedCity}
          onChange={handleCityChange}
          placeholder="Select a city"
          disabled={!selectedState}
          name="city list"
        />
      </div>
    </div>
  );
}