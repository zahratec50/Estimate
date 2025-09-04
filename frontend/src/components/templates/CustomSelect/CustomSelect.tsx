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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full font-roboto">
      {name && <label className="block mb-1 font-medium">{name}</label>}
      <button
        type="button"
        className={`w-full h-12 px-4 py-2 border border-gray-300 dark:border-secondary-600 rounded-md md:rounded-lg flex justify-between items-center bg-white dark:bg-secondary-800
          ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
        onClick={() => !disabled && setOpen((prev) => !prev)}
      >
        <span
          className={`text-sm ${
            value ? "text-neutral-800 dark:text-white" : "text-gray-400 dark:text-neutral-400"
          }`}
        >
          {value || placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-1 w-full border border-gray-300 dark:border-secondary-600 rounded-md shadow-lg bg-white dark:bg-secondary-800 max-h-60 overflow-y-auto animate-in fade-in-0 zoom-in-95 py-2"
        >
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
                  hover:bg-primary-50 dark:hover:bg-secondary-700 hover:rounded-lg
                  ${
                    isSelected
                      ? "font-medium bg-primary-50 dark:bg-secondary-700 border border-primary-500 dark:border-white rounded-lg"
                      : ""
                  }`}
              >
                <span className="text-neutral-800 dark:text-white">{option}</span>
                {isSelected && (
                  <div className="size-4 rounded-full bg-primary-500 dark:bg-white flex items-center justify-center">
                    <IoIosCheckmark className="text-white dark:text-black size-4" />
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
