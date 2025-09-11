"use client";

import { useState, useEffect, useRef, DragEvent, useCallback } from "react";
import { QuestionItem, ImageOption } from "@/store/useAppStore";
import { MdFileUpload } from "react-icons/md";
import { showErrorToast } from "../toasts/ErrorToast";

interface Props {
  question: QuestionItem;
  selectedAnswer: string | string[] | null;
  setAnswer: (answer: string[]) => void;
}

export const FileQuestion = ({
  question,
  selectedAnswer,
  setAnswer,
}: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedImages, setSelectedImages] = useState<ImageOption[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // بارگذاری پاسخ‌های قبلی از prop
  useEffect(() => {
    const storedUrls: string[] = Array.isArray(selectedAnswer)
      ? selectedAnswer
      : typeof selectedAnswer === "string"
      ? [selectedAnswer]
      : [];

    const storedImages: ImageOption[] = storedUrls
      .filter((url): url is string => typeof url === "string")
      .map((url) => ({
        imageUrl: url,
        label: url.split("/").pop() || "Uploaded Image",
      }));

    setSelectedImages(storedImages);
  }, [selectedAnswer]);

  const removeFile = useCallback(() => {
    setFile(null);
    setSelectedImages([]);
    setAnswer([]);
    if (inputRef.current) inputRef.current.value = "";
  }, [setAnswer]);

  const handleFile = useCallback(
    async (selectedFile: File | null) => {
      if (!selectedFile) return;
      if (!selectedFile.type.startsWith("image/")) {
        showErrorToast({
          title: "Invalid File",
          description: "Please upload an image file!",
          actionLabel: "OK",
          onAction: () => {},
        });
        return;
      }

      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        const newImage: ImageOption = {
          imageUrl,
          label: selectedFile.name,
        };
        setSelectedImages([newImage]);
        setAnswer([imageUrl]);
      };
      reader.readAsDataURL(selectedFile);
    },
    [setAnswer]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleFile(e.target.files?.[0] ?? null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0] ?? null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`w-1/3 rounded p-3 text-center transition mb-4 flex flex-col items-center justify-center border-2 border-dashed
          ${isDragging ? "border-primary-500 bg-primary-50" : "border-gray-300"}
          cursor-pointer`}
      >
        {selectedImages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedImages.map((img) => (
              <div
                key={img.imageUrl}
                className="flex items-center gap-2 bg-primary-0 border border-primary-500 rounded p-1"
              >
                <img
                  src={img.imageUrl}
                  alt={img.label}
                  className="w-16 h-16 rounded"
                />
                {/* <span className="text-lg">{img.label}</span> */}
              </div>
            ))}
          </div>
        )}
        {selectedImages.length > 0 ? (
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="px-3 py-1 text-xs md:text-base bg-red-500 text-white rounded hover:bg-red-600 transition mt-2"
            >
              Remove File
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 p-3">
            <span className="text-gray-500 dark:text-gray-400">
              Upload image
            </span>
            <MdFileUpload className="size-5 text-gray-500 dark:text-gray-400" />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        aria-label="file"
        onChange={handleChange}
        className="hidden"
        accept="image/*"
      />

      {question.hint && (
        <p className="text-sm text-gray-400 mt-1">{question.hint}</p>
      )}
    </div>
  );
};