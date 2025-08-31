"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

const CODE_LENGTH = 4;
const CORRECT_CODE = "1234"; // for test

export default function CodeInput() {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // only number

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // move
    if (value && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // بررسی کد بعد از آخرین عدد
    if (index === CODE_LENGTH - 1 && value) {
      const finalCode = newCode.join("");
      if (finalCode === CORRECT_CODE) {
        router.push("/dashboard");
      } else {
        setError(true);
        inputsRef.current.forEach((input) =>
          input?.classList.add("border-red-500")
        );
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 font-roboto">
      <div className="flex space-x-2">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            aria-label="OTP Digit Input"
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={clsx(
              "w-[81.5px] md:w-[89px] h-12 text-center text-xl dark:bg-white dark:text-blackNew-50 border rounded-md font-semibold focus:outline-none",
              error
                ? "border-red-500"
                : "border-neutral-300 focus:border-primary-500"
            )}
          />
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2">The password is incorrect</p>
      )}
    </div>
  );
}
