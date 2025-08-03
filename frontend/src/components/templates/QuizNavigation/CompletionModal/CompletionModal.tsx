"use client";

import React from "react";
import Lottie from "lottie-react";
import Click from "../../../../../public/assets/Clock.json"

export default function CompletionModal({ handleRegister }: { handleRegister: () => void }) {
  return (
    <div className="fixed inset-0 bg-black-50/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-secondary-900 dark:border dark:border-secondary-50 w-[90%] max-w-[400px] p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Well done!</h2>

        <div className="w-32 h-32 mx-auto mb-4">
          <Lottie animationData={Click} loop={true} />
        </div>

        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Just give us 1 hour and your building will be beautifully rebuilt.
        </p>

        <button
          onClick={handleRegister}
          className="bg-primary-500 dark:bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 dark:hover:bg-secondary-400 transition"
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}
