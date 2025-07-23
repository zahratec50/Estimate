"use client";
import React, { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface InputProps {
  labelName: string;
  name: string;
  type: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  icon1?: React.ReactNode;
  icon2?: React.ReactNode;
}

export default function Input({
  labelName,
  name,
  type,
  placeholder,
  register,
  error,
  icon1,
  icon2,
}: InputProps) {
  const [isFocus, setIsFocus] = useState(false);
  const [isOpenEyeIcon, setIsOpenEyeIcon] = useState(false);

  const toggleEye = () => setIsOpenEyeIcon((prev) => !prev);
  const inputType = icon1 ? (isOpenEyeIcon ? "text" : type) : type;

  return (
    <div className="w-80 sm:w-[350px] md:w-95">
      <label htmlFor={name} className="block text-sm font-medium text-black-50 mb-1">
        {labelName}
      </label>

      <div
        className={`w-full h-10 flex items-center px-3 border rounded-lg ${
          isFocus ? "ring-1 ring-primary-500" : ""
        } ${error ? "border-red-500" : "border-gray-300"}`}
      >
        <input
          id={name}
          type={inputType}
          {...register(name)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          className="w-full h-full outline-none"
          placeholder={placeholder || `Enter your ${labelName.toLowerCase()}`}
        />

        {icon1 && (
          <div onClick={toggleEye} className="cursor-pointer ml-2">
            {isOpenEyeIcon ? icon1 : icon2}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}
