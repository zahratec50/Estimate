"use client";

import React, { useState, useCallback, memo } from "react";
import FAQItemComponent from "./FAQItemComponent";


// question type
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

// questions
const questionAndAnswer: FAQItem[] = [
  {
    id: 1,
    question: "What you can estimate?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: 2,
    question: "How it work?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: 3,
    question: "Who can benefit from this?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: 4,
    question: "Why trust Estiper?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
];


// FAQItemComponent.displayName = "FAQItemComponent";

// main component
export default function YourQuestions() {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const toggleAnswer = useCallback((id: number) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  return (
    <section className="flex justify-center bg-white">
      <div className="w-full flex flex-col md:flex-row gap-3">
        {/* questions */}
        <div className="w-full h-full md:w-1/2 flex flex-col items-center justify-between order-2 md:order-1">
          {questionAndAnswer.map((item) => (
            <FAQItemComponent
              key={item.id}
              item={item}
              isOpen={!!openItems[item.id]}
              onToggle={() => toggleAnswer(item.id)}
            />
          ))}
        </div>

        {/* image*/}
        <div className="w-full md:w-1/2 h-[168px] md:h-[457px] bg-primary-200 rounded-2xl order-1 md:order-2" />
      </div>
    </section>
  );
}