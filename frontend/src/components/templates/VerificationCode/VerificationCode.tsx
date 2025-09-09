"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CodeInput from "./CodeInput/CodeInput";
import { ArrowLeft } from "lucide-react";

type MyComponentPropsResendCode = {
  resendCode: boolean;
};

export default function VerificationPage({
  resendCode,
}: MyComponentPropsResendCode) {
  const [code, setCode] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [timer, setTimer] = useState(164);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center md:px-[50px]">
      <div className="w-full h-full max-w-6xl flex items-center justify-center">
        {!isMobile && (
          <div className="hidden w-1/2 h-[660px] lg:flex">
            <div className="relative w-full h-full bg-gray-200 rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/verification.png"
                alt="Email"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="w-[390px] h-[660px] lg:w-1/2 lg:h-[660px] flex flex-col items-center justify-between lg:justify-center bg-white dark:bg-background rounded-lg pt-32 lg:pt-0">
          <div className="w-[350px] md:w-95">
            <button
              onClick={() => router.back()}
              className="flex items-center text-lg lg:text-sm text-blackNew-50 dark:text-white mb-8 hover:text-blackNew dark:hover:text-gray-200 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 lg:w-4 lg:h-4 mr-1" /> back
            </button>

            <h2 className="text-xl sm:text-lg lg:text-2xl text-blackNew-50 dark:text-white font-semibold">
              Enter verification code from email
            </h2>

            <p className="h-[42px] lg:h-[46px] mb-8 text-secondary-600 dark:text-secondary-200">
              Please enter the code we emailed you
              <br />
              <span className="font-semibold">{"{User Email}"}</span>
            </p>

            <label className="text-sm text-blackNew-50 dark:text-white font-medium">
              code
            </label>
            <CodeInput />
          </div>

          <div className="w-[350px] md:w-95">
            {isMobile ? (
              resendCode ? (
                <div className="w-full h-[431px] flex flex-col items-center justify-end gap-2 dark:text-white">
                  <button
                    className="w-full h-11 bg-secondary-700 hover:bg-secondary-900 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 cursor-pointer transition"
                    disabled={code.length < 4}
                  >
                    Resend Code
                  </button>
                  <button
                    className="w-full h-11 bg-primary-200 hover:bg-primary-700 dark:bg-secondary-500 dark:hover:bg-secondary-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 cursor-pointer transition"
                    disabled={code.length < 4}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <div>
                  <p className="h-11 mt-4 text-center text-blackNew-50 dark:text-white text-lg font-medium">
                    Resend code in {formatTime(timer)}
                  </p>
                  <button
                    className="w-full h-11 bg-primary-200 hover:bg-primary-200 dark:bg-secondary-400 dark:hover:bg-secondary-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 cursor-pointer transition"
                    disabled={code.length < 4}
                  >
                    Submit
                  </button>
                </div>
              )
            ) : resendCode ? (
              <div className="w-full h-24 mt-4 space-y-2">
                <button
                  className="w-full h-11 bg-secondary-900 hover:bg-primary-400 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 cursor-pointer transition"
                  disabled={code.length < 4}
                >
                  Resend Code
                </button>
                <button
                  className="w-full h-11 bg-primary-200 hover:bg-primary-100 dark:bg-secondary-400 dark:hover:bg-secondary-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 cursor-pointer transition"
                  disabled={code.length < 4}
                >
                  Submit
                </button>
              </div>
            ) : (
              <>
                <p className="h-11 mt-4 text-center text-blackNew-50 dark:text-white text-lg font-medium">
                  Resend code in {formatTime(timer)}
                </p>
                <button
                  className="w-full h-11 bg-primary-200 hover:bg-primary-200 dark:bg-secondary-400 dark:hover:bg-secondary-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 cursor-pointer transition"
                  disabled={code.length < 4}
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
