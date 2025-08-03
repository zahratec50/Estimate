// components/CustomSelect.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";

type CustomSelectProps = {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
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
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        className={`w-full px-4 py-2 border rounded-lg flex justify-between items-center bg-white dark:bg-secondary-800 
          ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
        onClick={() => !disabled && setOpen((prev) => !prev)}
      >
        <span className="text-lg text-black dark:text-white">
          {value || placeholder}
        </span>
        <FaChevronDown className="text-gray-400" />
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full border rounded-lg shadow-lg bg-white dark:bg-secondary-800 max-h-60 overflow-y-auto">
          {options.map((option) => {
            const isSelected = option === value;
            return (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`flex items-center  py-2 cursor-pointer text-sm
                  hover:bg-primary-100 dark:hover:bg-secondary-700
                  ${isSelected ? "font-medium bg-primary-100 text-primary-500 pr-4" : "px-4"}`}
              >
                {isSelected && <IoCheckmark className="size-4" />}
                <span>{option}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
