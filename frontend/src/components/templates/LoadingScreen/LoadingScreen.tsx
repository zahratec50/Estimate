// components/LoadingScreen.tsx
'use client';

import Image from 'next/image';

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-6 animate-fadeIn">
        {/* logo in center */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center animate-pulse shadow-md">
          <Image
            src="/images/Logo.png"
            alt="Logo"
            width={40}
            height={40}
            priority
            className='size-20'
          />
        </div>

        {/* Loading text */}
        <p className="text-primary-600 text-base font-medium tracking-wide animate-pulse">
          Loading...
        </p>

        {/* Animated gradient bar */}
        <div className="w-56 h-2 bg-gray-200 rounded overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-full animate-loading-bar bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500" />
        </div>
      </div>
    </div>
  );
}
