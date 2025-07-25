"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import clsx from "clsx";

function FinalModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-[400px] p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Well Done!</h2>
        <p className="mb-4">
          To complete the full test, you’ll need about 1.5 hours. Are you ready?
        </p>
        <button
          onClick={onClose}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition"
        >
          Start Full Test
        </button>
      </div>
    </div>
  );
}

export default function QuizNavigation({ currentPage }: { currentPage: number }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleNext = useCallback(() => {
    if (currentPage < 4) {
      router.push(`/firstQuiz/${currentPage + 1}`);
    } else {
      setShowModal(true);
    }
  }, [currentPage, router]);

  const handleBack = useCallback(() => {
    if (currentPage > 1) {
      router.push(`/firstQuiz/${currentPage - 1}`);
    }
  }, [currentPage, router]);

  return (
    <>
      <div className="w-full max-w-[600px] lg:w-[200px] flex items-center justify-between gap-4 mt-4 sm:mt-0">
        {currentPage > 1 && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="w-12 h-12 flex items-center justify-center border border-secondary-500 rounded-md hover:bg-gray-200 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-black-50"
              fill="none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        )}

        <button
          onClick={handleNext}
          className={clsx(
            "bg-primary-500 text-white rounded-lg font-medium",
            "hover:bg-primary-600 transition flex items-center justify-center gap-2",
            "w-full max-w-[169px] h-12 text-base sm:text-lg"
          )}
        >
          Continue
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>

      {showModal && <FinalModal onClose={() => setShowModal(false)} />}
    </>
  );
}
