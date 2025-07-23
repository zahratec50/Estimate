import React from "react";

import { CiCircleQuestion } from "react-icons/ci";
import { CiSquareQuestion } from "react-icons/ci";

export default function Header() {
  return (
    <div className="min-w-[390px] h-16 sm:h-[116px] lg:h-30 flex items-center mt-4 sm:mt-0 lg:px-[50px] ">
      <header className="w-full flex justify-between items-center p-4 sm:p-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          {/* Placeholder Logo */}
          <button type="button" aria-label="Open menu" className="flex sm:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-7 text-black-50"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <img
            src="../images/Logo.png"
            alt="logo"
            className="w-16 h-16 lg:w-20 lg:h-20"
          />
        </div>

        {/* Help Button */}
        <button className="w-[89px] h-10 sm:w-[134px] sm:h-11 lg:w-[134px] lg:h-11 flex items-center justify-center gap-x-2 border border-secondary-500 px-2 py-1 sm:px-4 sm:py-2 rounded-md sm:rounded-lg text-sm sm:text-lg font-medium hover:bg-primary-50">
          <CiCircleQuestion className="w-6 h-6 hidden sm:block" />
          <CiSquareQuestion className="w-6 h-6 block sm:hidden" />
          Help
        </button>
      </header>
    </div>
  );
}
