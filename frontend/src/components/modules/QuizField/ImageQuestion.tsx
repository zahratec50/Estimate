"use client";

import React, { useState, useEffect } from "react";
import ImageModal from "./ImageModal";
import { useAppStore, ImageOption, QuestionItem } from "@/store/useAppStore";
import { showErrorToast } from "../toasts/ErrorToast";

type ImageQuestionProps = {
  questionData: QuestionItem;
  isFirstQuiz: boolean;
  setAnswer: (answer: string | string[]) => void; // پراپ برای ذخیره پاسخ
};

export default function ImageQuestion({ questionData, isFirstQuiz, setAnswer }: ImageQuestionProps) {
  const [isSelectImage, setIsSelectImage] = useState(false);
  const multiple = questionData.multiple || false;
  const [selectedImages, setSelectedImages] = useState<ImageOption[]>([]);
  const { currentProjectId, isRegistered } = useAppStore();

  // بارگذاری پاسخ قبلی به صورت آرایه
  useEffect(() => {
    const storedAnswers: ImageOption[] = (() => {
      const allAnswers = isRegistered && currentProjectId
        ? useAppStore.getState().projects.find((p) => p.id === currentProjectId)?.mainQuizAnswers || []
        : useAppStore.getState().preQuizAnswers;

      const answerEntry = allAnswers.find((a) => a.question === questionData.title);
      if (!answerEntry || !answerEntry.answer) return [];

      const selectedUrls = Array.isArray(answerEntry.answer) ? answerEntry.answer : [answerEntry.answer];
      return (questionData.options as ImageOption[]).filter((o) => selectedUrls.includes(o.imageUrl));
    })();

    if (storedAnswers.length) setSelectedImages(storedAnswers);
  }, [questionData, currentProjectId, isRegistered]);

  const handleSelect = (option: ImageOption) => {
    if (multiple) {
      setSelectedImages((prev) => {
        const exists = prev.find((o) => o.imageUrl === option.imageUrl);
        if (exists) return prev.filter((o) => o.imageUrl !== option.imageUrl);
        return [...prev, option];
      });
    } else {
      setSelectedImages([option]);
    }
  };

  const handleSubmit = (images: ImageOption[]) => {
    if (images.length === 0) {
      showErrorToast({ title: "Selection Required", description: "Please select at least one image!", actionLabel: "OK", onAction: () => {} });
      return;
    }

    // ذخیره به صورت آرایه همیشه
    const answerToSave: string[] = images.map((o) => o.imageUrl);
    setAnswer(answerToSave);
    setSelectedImages(images);
    setIsSelectImage(false);
  };

  return (
    <div className="flex flex-col items-start gap-4">
      {selectedImages.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedImages.map((img) => (
            <div key={img.imageUrl} className="flex items-center gap-2 bg-primary-50 border border-primary-500 rounded p-1">
              <img src={img.imageUrl} alt={img.label} className="w-16 h-16 rounded" />
              <span className="text-lg">{img.label}</span>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => setIsSelectImage(true)} className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-300">
        {selectedImages.length > 0 ? "Change Photo" : "Select Photo"}
      </button>

      {isSelectImage && (
        <ImageModal
          isSelectImage={isSelectImage}
          setIsSelectImage={setIsSelectImage}
          questionData={questionData.options as ImageOption[]}
          onSelect={handleSelect}
          onSubmit={handleSubmit}
          multiple={multiple}
          selectedImages={selectedImages}
        />
      )}
    </div>
  );
}
