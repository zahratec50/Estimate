"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ImageOption } from "@/store/useAppStore";
import { showErrorToast } from "../toasts/ErrorToast";

type ImageModalProps = {
  isSelectImage: boolean;
  setIsSelectImage: React.Dispatch<React.SetStateAction<boolean>>;
  questionData: ImageOption[];
  onSelect: (option: ImageOption) => void;
  onSubmit: (images: ImageOption[]) => void;
  multiple: boolean;
  selectedImages: ImageOption[];
};

function ImageModal({
  isSelectImage,
  setIsSelectImage,
  questionData,
  onSelect,
  onSubmit,
  multiple,
  selectedImages,
}: ImageModalProps) {
  const [localSelected, setLocalSelected] = useState<ImageOption[]>(selectedImages);

  useEffect(() => {
    setLocalSelected(selectedImages);
  }, [selectedImages]);

  const toggleSelect = (option: ImageOption) => {
    if (multiple) {
      setLocalSelected((prev) => {
        const exists = prev.find((o) => o.imageUrl === option.imageUrl);
        if (exists) return prev.filter((o) => o.imageUrl !== option.imageUrl);
        return [...prev, option];
      });
    } else {
      setLocalSelected([option]);
      onSelect(option);
    }
  };

  const handleSubmit = () => {
    if (localSelected.length === 0) {
      showErrorToast({
        title: "Selection Required",
        description: "Please select at least one image!",
        actionLabel: "OK",
        onAction: () => {},
      });
      return;
    }
    onSubmit(localSelected);
    setIsSelectImage(false);
  };

  if (!isSelectImage) return null;

  return (
    <div className="fixed inset-0 bg-black-50/50 flex items-center justify-center z-50 font-roboto">
      <div className="bg-white dark:bg-secondary-900 dark:border dark:border-secondary-50 w-[90%] max-w-[1000px] p-6 rounded-lg shadow-lg">
        <div onClick={() => setIsSelectImage(false)} className="w-full flex items-center justify-end py-2 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <div className="py-4">
          <h3 className="text-2xl font-medium">Select Image{multiple ? "s" : ""}</h3>
          <span className="text-gray-500">Please choose one of the options</span>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {questionData.map((option) => {
            const selected = localSelected.some((o) => o.imageUrl === option.imageUrl);
            return (
              <div
                key={option.imageUrl}
                onClick={() => toggleSelect(option)}
                className={`flex flex-col items-center cursor-pointer border rounded-lg p-3 transition ${
                  selected ? "border-primary-500 bg-primary-50" : "border-gray-300 dark:border-secondary-700"
                }`}
              >
                <Image src={option.imageUrl} alt={option.label} width={100} height={149} className="rounded-md object-cover" />
                <p className="mt-2">{option.label}</p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={() => setIsSelectImage(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg">
            Close
          </button>
          <button onClick={handleSubmit} className="bg-primary-500 hover:bg-primary-300 text-white font-semibold py-2 px-4 rounded-lg">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ImageModal)