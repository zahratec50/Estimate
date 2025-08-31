"use client";

import Image from "next/image";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-6 animate-fadeIn">
        {/* logo in center */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center animate-pulse shadow-md">
          <Image
            src="/images/logo-black.png"
            alt="Logo"
            width={40}
            height={40}
            priority
            className="size-20 block dark:hidden"
          />
          <Image
            src="/images/Frame 20.png"
            alt="Logo"
            width={40}
            height={40}
            priority
            className="size-20 hidden dark:block"
          />
        </div>

        {/* Loading text */}
        <p className="text-primary-500 dark:text-white text-base font-medium tracking-wide animate-pulse">
          Loading...
        </p>

        {/* Animated gradient bar */}
        <div className="w-56 h-2 bg-gray-200 rounded overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-full animate-loading-bar bg-gradient-to-r from-primary-400 via-primary-300 to-primary-200 dark:from-secondary-400 dark:via-secondary-300 dark:to-secondary-200" />
        </div>
      </div>
    </div>
  );
}
