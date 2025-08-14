"use client";

import { useState, useRef, useEffect } from "react";
import { IoIosCheckmark } from "react-icons/io";

type CustomSelectProps = {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
};

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  name,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full font-roboto">
      <label className="font-roboto font-medium">{name}</label>
      <button
        type="button"
        className={`w-full h-12 px-4 py-2 border rounded-md md:rounded-lg flex justify-between items-center bg-white dark:bg-secondary-800 
          ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
        onClick={() => !disabled && setOpen((prev) => !prev)}
      >
        <span className="text-sm text-neutral-600 dark:text-white">
          {value || placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full border rounded-md shadow-lg bg-white dark:bg-secondary-800 max-h-60 overflow-y-auto">
          {options.map((option) => {
            const isSelected = option === value;
            return (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-2 cursor-pointer text-sm mx-2
                  hover:bg-primary-50 hover:border hover:border-primary-500 hover:rounded-lg dark:hover:bg-secondary-700
                  ${
                    isSelected
                      ? "font-medium bg-primary-50 border border-primary-500 rounded-lg"
                      : ""
                  }`}
              >
                <span>{option}</span>
                {isSelected && (
                  <div className="size-4 rounded-full bg-primary-500">
                    <IoIosCheckmark className="text-white size-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
