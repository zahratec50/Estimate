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

export const FileQuestion = ({ question, selectedAnswer, setAnswer }: Props) => {
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

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`w-1/3 border-2 border-dashed rounded p-3 text-center transition mb-4
          ${isDragging ? "border-primary-500 bg-primary-50" : "border-gray-300 bg-white dark:bg-gray-800"}
          cursor-pointer`}
      >
        {selectedImages.length > 0 ? (
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition mt-2"
            >
              Remove File
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-500 dark:text-gray-400">Upload image</span>
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

      {question.hint && <p className="text-sm text-gray-400 mt-1">{question.hint}</p>}
    </div>
  );
};




// "use client";

// import { useState, useEffect, useRef, DragEvent } from "react";
// import { useAppStore, QuestionItem } from "@/store/useAppStore";
// import { MdFileUpload } from "react-icons/md";
// import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
// import { showErrorToast } from "@/components/modules/toasts/ErrorToast";

// interface Props {
//   question: QuestionItem;
//   selectedAnswer: string | null; // نام یا URL فایل در Zustand
//   setAnswer: (answer: string) => void; // ذخیره نام فایل در Zustand
// }

// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// export const FileQuestion = ({ question, selectedAnswer, setAnswer }: Props) => {
//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(selectedAnswer);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     setPreview(selectedAnswer);
//     if (inputRef.current) inputRef.current.value = "";
//   }, [selectedAnswer]);

//   const uploadFileToAPI = async (file: File): Promise<string | null> => {
//     setIsUploading(true);
//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await fetch("/api/upload", { method: "POST", body: formData });
//       if (!res.ok) throw new Error("Upload failed");

//       const data = await res.json();
//       return data.url as string; // مسیر ذخیره شده روی سرور
//     } catch {
//       showErrorToast({ title: "Upload Error", description: "Failed to upload file." });
//       return null;
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleFile = async (selectedFile: File | null) => {
//     if (!selectedFile) return;

//     setFile(selectedFile);

//     // آپلود فایل به سرور
//     const uploadedUrl = await uploadFileToAPI(selectedFile);
//     if (!uploadedUrl) {
//       removeFile();
//       return;
//     }

//     // ذخیره فقط نام یا مسیر فایل در Zustand
//     setAnswer(uploadedUrl);

//     // پیش‌نمایش تصویر یا PDF
//     if (selectedFile.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onloadend = () => setPreview(reader.result as string);
//       reader.readAsDataURL(selectedFile);
//     } else if (selectedFile.type === "application/pdf") {
//       const reader = new FileReader();
//       reader.onload = async () => {
//         const typedarray = new Uint8Array(reader.result as ArrayBuffer);
//         const pdf = await pdfjsLib.getDocument(typedarray).promise;
//         const page = await pdf.getPage(1);
//         const viewport = page.getViewport({ scale: 1 });
//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d")!;
//         canvas.width = viewport.width;
//         canvas.height = viewport.height;
//         await page.render({ canvasContext: context, viewport }).promise;
//         setPreview(canvas.toDataURL());
//       };
//       reader.readAsArrayBuffer(selectedFile);
//     } else {
//       setPreview(null);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     handleFile(e.target.files?.[0] ?? null);

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     handleFile(e.dataTransfer.files[0] ?? null);
//   };

//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(true); };
//   const handleDragLeave = () => setIsDragging(false);

//   const removeFile = () => {
//     setFile(null);
//     setPreview(null);
//     setAnswer("");
//     if (inputRef.current) inputRef.current.value = "";
//   };

//   return (
//     <div className="flex flex-col gap-2 mt-4">
//       <div
//         onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
//         onClick={() => inputRef.current?.click()}
//         className={`w-1/3 border-2 border-dashed rounded p-3 text-center transition mb-4
//           ${isDragging ? "border-primary-500 bg-primary-50" : "border-gray-300 bg-white dark:bg-gray-800"}
//           cursor-pointer flex flex-col items-center justify-center`}
//       >
//         {isUploading ? (
//           <p className="text-gray-500 dark:text-gray-400">Uploading...</p>
//         ) : preview ? (
//           <div className="flex flex-col items-center gap-2">
//             {file?.type.startsWith("image/") && <img src={preview} alt="preview" className="max-h-40 w-auto rounded shadow" />}
//             {file?.type === "application/pdf" && <p className="text-sm text-gray-700 dark:text-gray-200">{file.name}</p>}
//             <button type="button" onClick={(e) => { e.stopPropagation(); removeFile(); }} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition mt-2">Remove File</button>
//           </div>
//         ) : (
//           <div className="flex items-center justify-center gap-2">
//             <span className="text-gray-500 dark:text-gray-400">Upload image or file</span>
//             <MdFileUpload className="size-5 text-gray-500 dark:text-gray-400" />
//           </div>
//         )}
//       </div>

//       <input ref={inputRef} type="file" aria-label="file" onChange={handleChange} className="hidden" accept="image/*,.pdf,.doc,.docx,.txt" />
//       {question.hint && <p className="text-sm text-gray-400 mt-1">{question.hint}</p>}
//     </div>
//   );
// };
