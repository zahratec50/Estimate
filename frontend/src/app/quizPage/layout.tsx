import type { ReactNode } from "react";
import Header from "@/components/modules/Header/Header";
import ProgressSegment from "@/components/modules/ProgressBar/ProgressBar";

export default function QuizPageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Header */}
      <Header />
      <div className=" bg-gray-50 flex flex-col pt-4 px-4 sm:pt-6 lg:px-5 lg:pb-2 sm:px-10 sm:pb-4 text-fontFamily-roboto">
        {/* Main Content */}
        <main className="flex-1 flex flex-col justify-start">
          <div className="flex items-center justify-center mb-4 sm:hidden">
            <ProgressSegment />
          </div>
          {/* Question Header */}
          {children}

          <hr className="hidden sm:block" />
          {/* Navigation Buttons */}
          <div className="h-12 sm:h-20 flex justify-between items-center ">
            {/* Progress Bar */}
            <div className="hidden sm:flex">
              <ProgressSegment />
            </div>

            {/* Previous Button */}
            <div className="w-[390px] sm:w-[249px] flex items-center justify-between sm:justify-center sm:gap-4">
              <button
                type="button"
                aria-label="Go back"
                className="w-12 h-12 flex items-center justify-center border border-secondary-500 rounded-md sm:rounded-lg hover:bg-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 sm:size-7 text-black-50"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </button>

              {/* Continue Button */}
              <button
                type="button"
                className="bg-primary-500 w-[169px] h-12 text-lg text-white rounded-lg font-medium hover:bg-primary-600 flex items-center justify-center gap-2"
              >
                Continue
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}