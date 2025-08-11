"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // یا از react-icons استفاده کن

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // جلوگیری از hydration mismatch

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      aria-label="Theme select"
      onClick={toggleTheme}
      className="relative w-14 h-6 flex items-center bg-secondary-50 dark:bg-secondary-500 rounded-full px-1 transition-colors duration-300 focus:outline-none"
    >
      <div
        className={`w-5 h-5 bg-white dark:bg-black-50 rounded-full shadow-md transform transition-transform duration-300 ${
          theme === "dark" ? "translate-x-7" : ""
        }`}
      />
      <div className="absolute left-[5.5px] top-[5px] text-primary-500 dark:text-white">
        <Sun className="w-4 h-4" />
      </div>
      <div className="absolute right-[5.5px] top-[4px] text-primary-500 dark:text-white">
        <Moon className="w-4 h-4" />
      </div>
    </button>
  );
}
