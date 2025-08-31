"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      aria-label="Theme select"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-10 h-4 md:w-14 md:h-6 flex items-center bg-secondary-50 rounded-full px-1 transition-colors duration-300 focus:outline-none"
    >
      <div
        className={`size-3 md:size-5 bg-white dark:bg-blackNew-50 rounded-full shadow-md transform transition-transform duration-300 ${
          theme === "dark" ? "translate-x-5 md:translate-x-7" : ""
        }`}
      />
    </button>
  );
}

export default React.memo(ThemeSwitcher);
