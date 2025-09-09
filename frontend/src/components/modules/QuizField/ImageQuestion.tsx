// "use client";

// import React, { useState, useEffect } from "react";
// import ImageModal from "./ImageModal";
// import { useAppStore, ImageOption, QuestionItem } from "@/store/useAppStore";
// import { showErrorToast } from "../toasts/ErrorToast";

// type ImageQuestionProps = {
//   questionData: QuestionItem;
//   isFirstQuiz: boolean;
//   setAnswer: (answer: string | string[]) => void; // پراپ برای ذخیره پاسخ
// };

// export default function ImageQuestion({ questionData, isFirstQuiz, setAnswer }: ImageQuestionProps) {
//   const [isSelectImage, setIsSelectImage] = useState(false);
//   const multiple = questionData.multiple || false;
//   const [selectedImages, setSelectedImages] = useState<ImageOption[]>([]);
//   const { currentProjectId, isRegistered } = useAppStore();

//   // بارگذاری پاسخ قبلی به صورت آرایه
//   useEffect(() => {
//     const storedAnswers: ImageOption[] = (() => {
//       const allAnswers = isRegistered && currentProjectId
//         ? useAppStore.getState().projects.find((p) => p.id === currentProjectId)?.mainQuizAnswers || []
//         : useAppStore.getState().preQuizAnswers;

//       const answerEntry = allAnswers.find((a) => a.question === questionData.title);
//       if (!answerEntry || !answerEntry.answer) return [];

//       const selectedUrls = Array.isArray(answerEntry.answer) ? answerEntry.answer : [answerEntry.answer];
//       return (questionData.options as ImageOption[]).filter((o) => selectedUrls.includes(o.imageUrl));
//     })();

//     if (storedAnswers.length) setSelectedImages(storedAnswers);
//   }, [questionData, currentProjectId, isRegistered]);

//   const handleSelect = (option: ImageOption) => {
//     if (multiple) {
//       setSelectedImages((prev) => {
//         const exists = prev.find((o) => o.imageUrl === option.imageUrl);
//         if (exists) return prev.filter((o) => o.imageUrl !== option.imageUrl);
//         return [...prev, option];
//       });
//     } else {
//       setSelectedImages([option]);
//     }
//   };

//   const handleSubmit = (images: ImageOption[]) => {
//     if (images.length === 0) {
//       showErrorToast({ title: "Selection Required", description: "Please select at least one image!", actionLabel: "OK", onAction: () => {} });
//       return;
//     }

//     // ذخیره به صورت آرایه همیشه
//     const answerToSave: string[] = images.map((o) => o.imageUrl);
//     setAnswer(answerToSave);
//     setSelectedImages(images);
//     setIsSelectImage(false);
//   };

//   return (
//     <div className="flex flex-col items-start gap-4">
//       {selectedImages.length > 0 && (
//         <div className="flex flex-wrap gap-2">
//           {selectedImages.map((img) => (
//             <div key={img.imageUrl} className="flex items-center gap-2 bg-primary-50 border border-primary-500 rounded p-1">
//               <img src={img.imageUrl} alt={img.label} className="w-16 h-16 rounded" />
//               <span className="text-lg">{img.label}</span>
//             </div>
//           ))}
//         </div>
//       )}

//       <button onClick={() => setIsSelectImage(true)} className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-300">
//         {selectedImages.length > 0 ? "Change Photo" : "Select Photo"}
//       </button>

//       {isSelectImage && (
//         <ImageModal
//           isSelectImage={isSelectImage}
//           setIsSelectImage={setIsSelectImage}
//           questionData={questionData.options as ImageOption[]}
//           onSelect={handleSelect}
//           onSubmit={handleSubmit}
//           multiple={multiple}
//           selectedImages={selectedImages}
//         />
//       )}
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { useAppStore, QuestionItem } from '@/store/useAppStore';
import { showErrorToast } from '@/components/modules/toasts/ErrorToast';
import Image from 'next/image';

interface ImageQuestionProps {
  questionData: QuestionItem;
  selectedAnswer: string[];
  setAnswer: (answer: string[]) => void;
  isFirstQuiz: boolean;
}

export default function ImageQuestion({
  questionData,
  selectedAnswer,
  setAnswer,
  isFirstQuiz,
}: ImageQuestionProps) {
  const { isContinueAllowed } = useAppStore();
  const [selected, setSelected] = useState<string[]>(selectedAnswer || []);

  useEffect(() => {
    setSelected(selectedAnswer || []);
  }, [selectedAnswer]);

  const handleSelect = (option: string) => {
    let newSelection: string[];
    if (questionData.multiple) {
      newSelection = selected.includes(option)
        ? selected.filter((s) => s !== option)
        : [...selected, option];
    } else {
      newSelection = [option];
    }
    if (isContinueAllowed(questionData, isFirstQuiz)) {
      setSelected(newSelection);
      setAnswer(newSelection);
    } else {
      showErrorToast({
        title: 'ورودی نامعتبر',
        description: questionData.validation?.errorMessage || 'لطفاً گزینه‌های معتبر انتخاب کنید.',
      });
    }
  };

  return (
    <div className="flex flex-col mt-4 gap-2">
      <label className="font-medium">{questionData.title}</label>
      <div className="grid grid-cols-2 gap-4">
        {questionData.options?.map((opt) => {
          const optValue = typeof opt === 'string' ? opt : opt.label;
          const imageUrl = typeof opt === 'object' ? opt.imageUrl : undefined;
          const isSelected = selected.includes(optValue);
          return (
            <div
              key={optValue}
              onClick={() => handleSelect(optValue)}
              className={`p-2 border rounded cursor-pointer ${
                isSelected ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
              }`}
            >
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={optValue}
                  width={100}
                  height={100}
                  className="w-full h-24 object-cover rounded"
                />
              )}
              <span className="block text-center mt-2">{optValue}</span>
            </div>
          );
        })}
      </div>
      {questionData.hint && <p className="text-gray-500 text-sm mt-1">{questionData.hint}</p>}
    </div>
  );
}