"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import Click from "../../../../../../public/assets/Clock.json";

interface CompletionModalProps {
  handleRegister: () => void;
}

const CompletionModalBase = ({ handleRegister }: CompletionModalProps) => {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(3);

  // ✅ Countdown logic
  useEffect(() => {
    if (secondsLeft <= 0) {
      handleRegister(); // callback parent
      router.push("/subscription"); // navigate once
      return;
    }

    const timer = setTimeout(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, handleRegister, router]);

  return (
    <div className="fixed inset-0 bg-black-50/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-secondary-900 dark:border dark:border-secondary-50 w-[90%] max-w-[400px] p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Well done!</h2>

        <div className="w-32 h-32 mx-auto mb-2">
          <Lottie animationData={Click} loop />
        </div>

        <div className="text-center">
          <span className="text-2xl font-bold text-gray-700 dark:text-gray-300 animate-pulseScale">
            {secondsLeft}
          </span>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Just give us 1 hour and your building will be beautifully rebuilt.
        </p>
      </div>
    </div>
  );
};

// ✅ Prevent unnecessary re-renders
const CompletionModal = React.memo(CompletionModalBase);

export default CompletionModal;
