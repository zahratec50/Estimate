import React from "react";

import { IoCheckmarkDone } from "react-icons/io5";
import { BsFillQuestionSquareFill } from "react-icons/bs";

const YourQuestions = [
  {
    id: 1,
    question: "What is your name?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: 2,
    question: "What is your age?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: 3,
    question: "What is your favorite color?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: 4,
    question: "What is your hobby?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  
];

export default function Question() {
  return (
    <div className="w-full h-full">
      <div className="w-full">
        {/* <h2 className="text-3xl font-bold">Your Questions</h2> */}
        <div className="w-full min-h-screen flex items-center justify-center mt-3">
          <div className="w-full h-full flex flex-col items-center justify-between">
            {YourQuestions.map((item) => (
              <div key={item.id} className="w-full h-[250px] mb-3 flex items-center justify-between gap-3">
                <div className="w-1/2 h-full bg-primary-200 rounded-xl">
                    <span></span>
                </div>
                <div className="w-1/2 flex flex-col justify-center">
                  <div className="flex">
                    <BsFillQuestionSquareFill className="size-6 text-primary-500 mr-2" />
                    <strong className="text-2xl text-black-50 mb-2">{item.question}</strong>
                  </div>
                  <p className="text-lg text-neutral-700 font-roboto pl-4">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
