"use client"
import React, {memo} from 'react'

const QuestionIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="none"
    viewBox="0 0 28 28"
  >
    <path
      fill={isOpen ? "#C7A16F" : "#858C94"}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 27.33C7.71 27.33 4.57 27.33 2.62 25.38C0.67 23.43 0.67 20.29 0.67 14C0.67 7.71 0.67 4.57 2.62 2.62C4.57 0.67 7.71 0.67 14 0.67C20.29 0.67 23.43 0.67 25.38 2.62C27.33 4.57 27.33 7.71 27.33 14C27.33 20.29 27.33 23.43 25.38 25.38C23.43 27.33 20.29 27.33 14 27.33ZM14 8.33C13.17 8.33 12.5 9.01 12.5 9.83C12.5 10.39 12.05 10.83 11.5 10.83C10.95 10.83 10.5 10.39 10.5 9.83C10.5 7.9 12.07 6.33 14 6.33C15.93 6.33 17.5 7.9 17.5 9.83C17.5 10.78 17.12 11.64 16.51 12.27C16.39 12.4 16.27 12.52 16.16 12.63C15.87 12.92 15.62 13.17 15.4 13.45C15.1 13.83 15 14.1 15 14.33V15.33C15 15.89 14.55 16.33 14 16.33C13.45 16.33 13 15.89 13 15.33V14.33C13 13.46 13.41 12.75 13.82 12.22C14.12 11.83 14.51 11.45 14.82 11.14C14.91 11.04 15 10.96 15.08 10.88C15.34 10.61 15.5 10.24 15.5 9.83C15.5 9.01 14.83 8.33 14 8.33ZM14 20.67C14.74 20.67 15.33 20.07 15.33 19.33C15.33 18.6 14.74 18 14 18C13.26 18 12.67 18.6 12.67 19.33C12.67 20.07 13.26 20.67 14 20.67Z"
    />
  </svg>
);

// arrow icon
const ToggleIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d={isOpen ? "M4.5 15.75l7.5-7.5 7.5 7.5" : "M19.5 8.25l-7.5 7.5-7.5-7.5"}
    />
  </svg>
);


interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQItemComponent = memo(
  ({
    item,
    isOpen,
    onToggle,
  }: {
    item: FAQItem;
    isOpen: boolean;
    onToggle: () => void;
  }) => (
    <div
      className={`w-full bg-primary-50 transition-all duration-200 ${
        isOpen ? "rounded-xl py-2" : "rounded-3xl py-8"
      } px-4`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-${item.id}`}
        className="flex justify-between items-center w-full text-left"
      >
        <div className="flex items-center gap-3">
          <QuestionIcon isOpen={isOpen} />
          <h3 className="text-base md:text-xl font-semibold">
            {item.question}
          </h3>
        </div>
        <ToggleIcon isOpen={isOpen} />
      </button>
      {isOpen && (
        <div
          id={`faq-${item.id}`}
          className="mt-3 text-sm md:text-xl text-black-50 max-w-md"
        >
          {item.answer}
        </div>
      )}
    </div>
  )
);

export default FAQItemComponent

