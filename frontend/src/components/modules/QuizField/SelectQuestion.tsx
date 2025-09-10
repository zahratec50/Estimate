// import { useState, useEffect } from "react";
// import states from "@/data/states.json";
// import CustomSelect from "@/components/templates/CustomSelect/CustomSelect";
// import { QuestionItem } from "@/store/useAppStore";

// interface ImageOption {
//   label: string;
//   value?: string;
//   imageUrl?: string;
// }

// interface SelectQuestionProps {
//   questionData: QuestionItem;
//   selectedAnswer: string | string[] | null;
//   setAnswer: (answer: string | string[]) => void;
//   isFirstQuiz: boolean;
// }

// export default function SelectQuestion({
//   questionData,
//   selectedAnswer,
//   setAnswer,
//   isFirstQuiz,
// }: SelectQuestionProps) {
//   const [selectedState, setSelectedState] = useState<string>("");
//   const [selectedCity, setSelectedCity] = useState<string>("");

//   const stateOptions: ImageOption[] = Object.keys(states.countries.USA).map(
//     (state) => ({
//       label: state,
//       value: state,
//     })
//   );

//   const cityOptions: ImageOption[] = selectedState
//     ? (
//         states.countries.USA[
//           selectedState as keyof typeof states.countries.USA
//         ] || []
//       ).map((city) => ({
//         label: city,
//         value: city,
//       }))
//     : [];

//   const options: ImageOption[] = questionData.options
//   ? questionData.options.map(opt => ({
//       label: typeof opt === 'string' ? opt : opt.label,
//       value: typeof opt === 'string' ? opt : opt.imageUrl,
//     }))
//   : [];


//   useEffect(() => {
//     if (questionData.type === "select" && selectedAnswer) {
//       if (isFirstQuiz) {
//         const answer = typeof selectedAnswer === "string" ? selectedAnswer : "";
//         const parts = answer.split(" - ");
//         setSelectedState(parts[0] || "");
//         setSelectedCity(parts[1] || "");
//       } else {
//         setSelectedState(
//           typeof selectedAnswer === "string" ? selectedAnswer : ""
//         );
//         setSelectedCity("");
//       }
//     } else {
//       setSelectedState("");
//       setSelectedCity("");
//     }
//   }, [selectedAnswer, questionData, isFirstQuiz]);

//   const handleStateChange = (stateName: string) => {
//     setSelectedState(stateName);
//     if (isFirstQuiz) {
//       setSelectedCity("");
//     } else {
//       setAnswer(stateName);
//     }
//   };

//   const handleCityChange = (cityName: string) => {
//     setSelectedCity(cityName);
//     if (selectedState && cityName) {
//       setAnswer(`${selectedState} - ${cityName}`);
//     }
//   };

//   return (
//     <div className="col-span-full flex flex-col md:flex-row items-center justify-between gap-4 mt-4 sm:pb-[80px]">
//       {isFirstQuiz ? (
//         <>
//           <div className="w-full md:w-1/2">
//             <CustomSelect
//               options={stateOptions}
//               value={selectedState}
//               onChange={handleStateChange}
//               placeholder="Select a state"
//               name="state list"
//             />
//           </div>
//           <div className="w-full md:w-1/2">
//             <CustomSelect
//               options={cityOptions}
//               value={selectedCity}
//               onChange={handleCityChange}
//               placeholder="Select a city"
//               disabled={!selectedState}
//               name="city list"
//             />
//           </div>
//         </>
//       ) : (
//         <div className="w-full md:w-1/2">
//           <CustomSelect
//             options={options}
//             value={selectedState}
//             onChange={handleStateChange}
//             placeholder="Select"
//             name=""
//           />
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import states from "@/data/states.json";
import CustomSelect from "@/components/templates/CustomSelect/CustomSelect";
import { QuestionItem } from "@/store/useAppStore";

interface ImageOption {
  label: string;
  value?: string;
  imageUrl?: string;
}

interface SelectQuestionProps {
  questionData: QuestionItem;
  selectedAnswer: string | string[] | null;
  setAnswer: (answer: string | string[]) => void;
  isFirstQuiz: boolean;
}

export default function SelectQuestion({
  questionData,
  selectedAnswer,
  setAnswer,
  isFirstQuiz,
}: SelectQuestionProps) {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const stateOptions: ImageOption[] = Object.keys(states.countries.USA).map(
    (state) => ({
      label: state,
      value: state,
    })
  );

  const cityOptions: ImageOption[] = selectedState
    ? (
        states.countries.USA[
          selectedState as keyof typeof states.countries.USA
        ] || []
      ).map((city) => ({
        label: city,
        value: city,
      }))
    : [];

  const options: ImageOption[] = questionData.options
  ? questionData.options.map(opt => ({
      label: typeof opt === 'string' ? opt : opt.label,
      value: typeof opt === 'string' ? opt : opt.imageUrl,
    }))
  : [];


  useEffect(() => {
    if (questionData.type === "select" && selectedAnswer) {
      if (isFirstQuiz) {
        const answer = typeof selectedAnswer === "string" ? selectedAnswer : "";
        const parts = answer.split(" - ");
        setSelectedState(parts[0] || "");
        setSelectedCity(parts[1] || "");
      } else {
        setSelectedState(
          typeof selectedAnswer === "string" ? selectedAnswer : ""
        );
        setSelectedCity("");
      }
    } else {
      setSelectedState("");
      setSelectedCity("");
    }
  }, [selectedAnswer, questionData, isFirstQuiz]);

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    if (isFirstQuiz) {
      setSelectedCity("");
    } else {
      setAnswer(stateName);
    }
  };

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    if (selectedState && cityName) {
      setAnswer(`${selectedState} - ${cityName}`);
    }
  };

  return (
    <div className="col-span-full flex flex-col md:flex-row items-center justify-between gap-4 mt-4 sm:pb-[80px]">
      {isFirstQuiz ? (
        <>
          <div className="w-full md:w-1/2">
            <CustomSelect
              options={stateOptions}
              value={selectedState}
              onChange={handleStateChange}
              placeholder="Select a state"
              name="state list"
            />
          </div>
          <div className="w-full md:w-1/2">
            <CustomSelect
              options={cityOptions}
              value={selectedCity}
              onChange={handleCityChange}
              placeholder="Select a city"
              disabled={!selectedState}
              name="city list"
            />
          </div>
        </>
      ) : (
        <div className="w-full md:w-1/2">
          <CustomSelect
            options={options}
            value={selectedState}
            onChange={handleStateChange}
            placeholder="Select"
            name=""
          />
        </div>
      )}
    </div>
  );
}