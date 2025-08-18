"use client";

import Link from "next/link";
import Image from "next/image";
import {
  IoNotificationsOutline,
  IoSearchOutline,
  IoClose,
  IoExitOutline,
} from "react-icons/io5";
import { FaHourglassStart } from "react-icons/fa6";
import clsx from "clsx";
import { useAppStore } from "@/store/useAppStore";

interface SidebarProps {
  isOpen?: boolean;
  isHelpOpen: boolean;
  onClose?: () => void;
}

const Sidebar = ({
  isOpen: propsIsOpen,
  onClose: propsOnClose,
  isHelpOpen,
}: SidebarProps) => {
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);

  // اگر props داده شده بود از آن استفاده کن، در غیر این صورت از استور
  const isOpen = propsIsOpen ?? isSidebarOpen;
  const handleClose = propsOnClose ?? toggleSidebar;

  return (
    <>
      {/* Overlay for mobile */}
      <div
        onClick={handleClose}
        className={clsx(
          "fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden",
          {
            "opacity-100 pointer-events-auto": isOpen,
            "opacity-0 pointer-events-none": !isOpen,
          }
        )}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-64 flex-col justify-between p-4 dark:bg-secondary-500 bg-primary-500 shadow-lg z-50 transition-transform duration-300",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
            "md:translate-x-0 md:flex": true,
          }
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:justify-center">
          <Link href="/" onClick={handleClose}>
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
            aria-label="Close Sidebar"
            onClick={handleClose}
            className="md:hidden text-gray-600 hover:text-gray-200 dark:text-secondary-300 dark:hover:text-secondary-100"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 dark:text-secondary-200 text-white font-medium pl-1">
          <Link href='/dashboard' className="flex items-center gap-2 hover:text-primary-100">
            <FaHourglassStart className="size-5" />
            Start
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="space-y-4 dark:text-secondary-200 text-white font-medium pl-1">
          <Link
            href="/notifications"
            className="flex items-center gap-2 hover:text-primary-100"
            onClick={handleClose}
          >
            <IoNotificationsOutline className="w-5 h-5" />
            Notifications
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-primary-100"
            onClick={handleClose}
          >
            <IoSearchOutline className="w-5 h-5" />
            Search
          </Link>
          <button
            type="button"
            className="flex items-center gap-2 hover:text-primary-100"
            onClick={handleClose}
          >
            <IoExitOutline className="w-5 h-5" />
            Sign Out
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
