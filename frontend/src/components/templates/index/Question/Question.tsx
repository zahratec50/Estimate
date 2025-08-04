import React from "react";

// import { IoCheckmarkDone } from "react-icons/io5";
// import { BsFillQuestionSquareFill } from "react-icons/bs";
// import { BsArrowReturnRight } from "react-icons/bs";

import Link from "next/link";

type QuestionProps = {
  question: string;
  answer: string;
  id: number;
};

export default function Question({question, answer, id}: QuestionProps) {
  return (
    <div className="w-full h-[400px]">
      <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-5 xl:px-0">
        <div className={`w-full lg:w-1/2 h-full bg-primary-200 rounded-2xl mb-10 lg:mb-0 ${id%2===0 ? 'order-2 lg:order-1' : 'order-1 lg:order-2'}`}>
          <span></span>
        </div>

        <div className={`w-full lg:w-1/2 flex items-center ${id%2===0 ? 'order-2 justify-start lg:justify-end' : 'order-1 justify-start'}`}> 
          <div className="w-[459px] h-60 flex flex-col gap-5 lg:gap-9">
            <h2 className="text-[28px] lg:text-4xl font-semibold">
              {question}
            </h2>
            <span>{answer}</span>
            <div className="flex flex-col lg:flex-row lg:items-center gap-5">
              <button className="w-36 py-3 bg-newGray-agreeable hover:bg-newGray-warm text-white rounded-md">
                <Link href="/firstQuiz/1">Get Started</Link>
              </button>
              <span className="w-fit border-b border-newGray-white hover:border-newGray transition-all duration-200">
                <Link href="/signin">Already have an account? Sign in</Link>
                
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
