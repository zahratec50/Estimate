"use client";

import { useState, useEffect } from "react";
import { IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import { TbHelpOctagon } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import clsx from "clsx";

import ThemeSwitcher from "../Theme/Theme";

interface TopbarProps {
  onMenuClick: () => void;
  onHelpToggle: (open: boolean) => void; // ✅ اضافه شده
}

export default function Topbar({ onMenuClick, onHelpToggle }: TopbarProps) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    onHelpToggle(isHelpOpen);
  }, [isHelpOpen, onHelpToggle]);

  return (
    <>
      {/* Topbar */}
      <header className="flex items-center justify-between sm:justify-end px-2 py-3 sm:px-6 shadow-md dark:shadow-secondary-500 relative z-30 dark:bg-secondary-900 bg-white">
        {/* Mobile Menu Button + Logo */}
        <div className="flex items-center gap-2 md:hidden">
          <button type="button" aria-label="Open menu" onClick={onMenuClick}>
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <Image
            src="/images/Logo.png"
            alt="logo"
            width={48}
            height={48}
            className="w-10 h-10"
          />
        </div>

        {/* theme */}
        <div className="ml-5 md:ml-64 ">
          <ThemeSwitcher />
        </div>

        {/* Desktop-only actions */}
        <div className="flex items-center space-x-3 md:space-x-6 dark:text-white text-secondary-700 text-sm md:text-base font-medium ml-auto">
          <span className="hidden md:flex items-center cursor-pointer">
            <IoNotificationsOutline className="w-5 h-5 mr-1" />
            Notifications
          </span>
          <span className="hidden md:flex items-center cursor-pointer">
            <IoSearchOutline className="w-5 h-5 mr-1" />
            {isHelpOpen ? "" : "Search"}
          </span>
          <span
            className="flex items-center cursor-pointer"
            onClick={() => setIsHelpOpen(true)}
          >
            <TbHelpOctagon className="w-5 h-5 mr-1" />
            {isHelpOpen ? "" : "Help"}
          </span>
        </div>
      </header>

      {/* Help Panel (Slide-in) */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-[320px] dark:bg-secondary-800 bg-white shadow-lg z-50 transition-transform duration-300 border-l border-gray-200",
          isHelpOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center px-4 py-[10px] border-b">
          <h2 className="text-lg font-semibold">Help</h2>
          <button
            onClick={() => setIsHelpOpen(false)}
            aria-label="Close Help"
            className="text-gray-600 hover:text-gray-500 dark:text-neutral-200 dark:hover:text-white"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>
        <div>
          <div className="flex items-center gap-2 m-6 border rounded-md p-2">
            <IoSearchOutline className="w-5 h-5 mr-1 text-secondary-200" />
            <input
              type="text"
              placeholder="Search..."
              className="text-sm placeholder:text-sm placeholder:text-secondary-300 dark:placeholder:text-secondary-200 dark:bg-secondary-800 dark:text-white outline-none"
            />
          </div>
        </div>

        <div className="p-4 space-y-4 text-sm text-gray-700 dark:text-white">
          <p>Need help using the dashboard?</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Quick tour</li>
            <li>User guide</li>
            <li>Contact support</li>
          </ul>
        </div>
      </div>
    </>
  );
}
