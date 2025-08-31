"use client";

import { useEffect, useRef } from "react";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import clsx from "clsx";
import { useAppStore } from "@/store/useAppStore";

interface HelpPanelProps {
  isHelpOpen: boolean;
}

export default function HelpPanel({ isHelpOpen }: HelpPanelProps) {
  const { toggleHelp } = useAppStore();
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus management for accessibility
  useEffect(() => {
    if (isHelpOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isHelpOpen]);

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      className={clsx(
        "fixed top-0 right-0 h-full w-[320px] bg-white dark:bg-secondary-800 shadow-lg z-50 outline-0",
        "transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-secondary-700",
        isHelpOpen
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0 pointer-events-none"
      )}
    >
      <div className="flex justify-between items-center px-4 py-[10px] border-b border-gray-200 dark:border-secondary-700">
        <h2 className="text-lg font-semibold text-blackNew-50 dark:text-white">
          Help
        </h2>
        <button
          onClick={toggleHelp}
          aria-label="Close Help"
          className="text-gray-601 dark:text-gray-300 hover:text-primary-500 dark:hover:text-secondary-500"
        >
          <IoClose className="w-6 h-6" />
        </button>
      </div>
      <div>
        <div className="flex items-center gap-2 m-6 border border-gray-201 dark:border-secondary-700 rounded-md p-2">
          <IoSearchOutline className="w-5 h-5 mr-1 text-secondary-600 dark:text-secondary-200" />
          <input
            type="text"
            placeholder="Search..."
            className="text-sm placeholder:text-sm placeholder:text-secondary-600 dark:placeholder:text-secondary-200 dark:bg-secondary-800 dark:text-white outline-none w-full"
          />
        </div>
      </div>
      <div className="p-4 space-y-4 text-sm text-gray-601 dark:text-gray-300">
        <p>Need help using the dashboard?</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Quick Tour</li>
          <li>User Guide</li>
          <li>Contact Support</li>
        </ul>
      </div>
    </div>
  );
}
