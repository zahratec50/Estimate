"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CodeInput from "../CodeInput/CodeInput";

import { ArrowLeft } from "lucide-react";

type MyComponentPropsResendCode = {
  resendCode: boolean;
};

export default function VerificationPage({
  resendCode,
}: MyComponentPropsResendCode) {
  const getInitialIsMobile = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  };

  const [code, setCode] = useState("");
  const [isMobile, setIsMobile] = useState<boolean>(getInitialIsMobile());
  const [timer, setTimer] = useState(164); // 2:44 دقیقه زمان برآورد شده
  const router = useRouter();

  useEffect(() => {
    // بررسی ریسپانسیو در زمان بارگذاری و تغییر اندازه صفحه
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // اولین اجرای
    window.addEventListener("resize", handleResize);

    // timer
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.value.length <= 4) {
  //     setCode(e.target.value);
  //   }
  // };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center justify-center md:px-[50px] md:mt-4">
      {/* left image*/}
      {!isMobile && (
        <div className="hidden w-1/2 h-[660px] lg:flex">
          <div className="relative w-full h-full bg-gray-200 rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
            <div className="absolute inset-0 flex justify-center items-center text-gray-400 font-semibold text-lg">
              <Image
                src="/images/verification.png"
                alt="Email"
                fill
                className="object-cover h-full w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* form */}
      <div className="w-[390px] h-[660px] lg:w-1/2 lg:h-[670px] flex flex-col items-center justify-between lg:justify-center bg-white rounded-lg pt-32 lg:pt-0">
        <div className="w-[350px] md:w-95">
          <button
            className="flex items-center text-lg lg:text-sm text-black-50 mb-8 hover:text-black"
            onClick={() => router.back()}
          >
            <ArrowLeft className=" w-6 h-6 lg:w-4 lg:h-4 mr-1" /> back
          </button>
          <h2 className="text-xl sm:text-lg lg:text-2xl text-black-50 font-semibold">
            Enter verification code from email
          </h2>
          <p className="h-[42px] lg:h-[46px] mb-8 text-secondary-600">
            Please enter the code we emailed you
            <br />
            <span className="font-semibold">{"{User Email}"}</span>
          </p>
          <label htmlFor="" className="text-sm text-black-50 font-medium">
            code
          </label>
          <CodeInput />
          </div>
          <div className="w-[350px] md:w-95">
          {isMobile ? (
            resendCode ? (
              <div className="w-[350px] h-[431px] flex flex-col items-center justify-end gap-2">
                <button
                  className={`w-full h-11 bg-secondary-700 hover:bg-secondary-900 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50`}
                  disabled={code.length < 4}
                >
                  Resend Code
                </button>
                <button
                  className={`w-full h-11 bg-primary-400 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50`}
                  disabled={code.length < 4}
                >
                  Submit
                </button>
              </div>
            ) : (
              <div>
                <p className="h-11 mt-4 text-center text-black-50 text-lg font-medium">
                  Resend code in {formatTime(timer)}
                </p>

                <button
                  className={`w-full h-11 bg-primary-400 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50`}
                  disabled={code.length < 4}
                >
                  Submit
                </button>
              </div>
            )
          ) : resendCode ? (
            <div className="w-95 h-24 mt-4 space-y-2">
              <button
                className={`w-95 h-11 bg-secondary-700 hover:bg-secondary-900 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50`}
                disabled={code.length < 4}
              >
                Resend Code
              </button>
              <button
                className={`w-95 h-11 bg-primary-400 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50`}
                disabled={code.length < 4}
              >
                Submit
              </button>
            </div>
          ) : (
            <>
              <p className="h-11 mt-4 text-center text-black-50 text-lg font-medium">
                Resend code in {formatTime(timer)}
              </p>

              <button
                className={`w-full h-11 bg-primary-400 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50`}
                disabled={code.length < 4}
              >
                Submit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
