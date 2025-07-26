"use client";

import Link from "next/link";
import Image from "next/image";
import { TbHelpOctagon } from "react-icons/tb";
import { IoSearchOutline, IoNotificationsOutline, IoClose } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import clsx from "clsx";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        onClick={onClose}
        className={clsx(
          "fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden",
          {
            "opacity-100 pointer-events-auto": isOpen,
            "opacity-0 pointer-events-none": !isOpen,
          }
        )}
      />

      {/* Sidebar itself */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-64 flex-col justify-between p-4 dark:bg-secondary-500 bg-primary-500 shadow-lg z-50 transition-transform duration-300",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
            "md:translate-x-0 md:flex": true,
            "hidden": !isOpen && typeof window !== "undefined" && window.innerWidth < 768,
          }
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:justify-center">
          <Link href="/" onClick={onClose}>
            <Image
              src="/images/Frame 20.png"
              alt="logo"
              width={80}
              height={80}
              className="cursor-pointer"
            />
          </Link>

          {/* Close icon for mobile */}
          <button
            type="button"
            aria-label="open Icon"
            onClick={onClose}
            className="md:hidden text-gray-600 hover:text-gray-200 dark:text-secondary-300 dark:hover:text-secondary-100"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="space-y-4 dark:text-secondary-200 text-secondary-900 font-medium pl-1">
          <Link href="/notifications" className="flex items-center gap-2 hover:text-primary-100" onClick={onClose}>
            <IoNotificationsOutline className="w-5 h-5" />
            Notifications
          </Link>
          <Link href="/" className="flex items-center gap-2 hover:text-primary-100" onClick={onClose}>
            <IoSearchOutline className="w-5 h-5" />
            Search
          </Link>
          <button
            type="button"
            className="flex items-center gap-2 hover:text-primary-100"
            onClick={onClose}
          >
            <IoExitOutline className="w-5 h-5" />
            Sign Out
          </button>
        </nav>
      </aside>
    </>
  );
}
