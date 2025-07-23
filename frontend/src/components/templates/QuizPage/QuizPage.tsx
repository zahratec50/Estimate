"use client";
import Header from "@/components/modules/Header/Header";
import ProgressSegment from "@/components/modules/ProgressBar/ProgressBar";
import React from "react";
import { useState } from "react";

import { IoCheckmarkOutline } from "react-icons/io5";

export default function QuizPage() {
  const [selectedOption, setSelectedOption] = useState<number | null>(1);
  const options = [
    { title: "Card Title", description: "Card Description" },
    { title: "Option Title", description: "Option Description" },
    { title: "Option Title", description: "Option Description" },
    { title: "Option Title", description: "Option Description" },
  ];
  const progress = 40; // Example progress percent

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  return (
    <>
      {/* Question Header */}

      <h1 className="text-xl sm:text-3xl font-medium text-black-50">
        Question Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua?
      </h1>
      {/* Subtitle */}
      <p className="sm:text-2xl text-neutral-700 mb-6">
        Hint Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua?
      </p>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mb-10 sm:pb-[80px]">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index + 1)}
            className={`relative p-4 rounded-lg border transition-all duration-200 ${
              selectedOption === index + 1
                ? "border-primary-500 bg-primary-50 shadow-lg"
                : "border-neutral-300 bg-white hover:bg-neutral-50"
            }`}
          >
            {selectedOption === index + 1 && (
              <div className="absolute -top-3 right-4 rounded-lg p-1 bg-primary-500 text-white">
                <IoCheckmarkOutline />
              </div>
            )}

            <h3 className="text-lg sm:text-xl text-black-50 font-medium text-left">
              {option.title}
            </h3>
            <p className="text-xs sm:text-sm text-secondary-600 text-left">
              {option.description}
            </p>
          </button>
        ))}
      </div>

      <hr className="hidden sm:block" />
    </>
  );
}