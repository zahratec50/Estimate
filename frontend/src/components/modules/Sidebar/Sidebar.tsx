"use client";

import Link from "next/link";
import Image from "next/image";
import {
  IoNotificationsOutline,
  IoSearchOutline,
  IoClose,
  IoExitOutline,
} from "react-icons/io5";
import { IoChatbubblesOutline } from "react-icons/io5";
import clsx from "clsx";
import { useAppStore } from "@/store/useAppStore";
import { clearRefreshTokenCookie } from "@/utils/auth";
import { useRouter } from "next/navigation";

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
  const isRegistered = useAppStore((state) => state.isRegistered);

  const isOpen = propsIsOpen ?? isSidebarOpen;
  const handleClose = propsOnClose ?? toggleSidebar;

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
      router.push("/"); // ریدایرکت به صفحه اصلی
      handleClose
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        onClick={handleClose}
        className={clsx(
          "fixed inset-0 bg-blackNew-50/50 z-40 transition-opacity duration-300 lg:hidden",
          {
            "opacity-100 pointer-events-auto": isOpen,
            "opacity-0 pointer-events-none": !isOpen && !isHelpOpen,
          }
        )}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full flex flex-col justify-between p-4 dark:bg-secondary-800 bg-primary-500 shadow-lg z-50 transition-transform duration-300",
          {
            "w-2/3 md:w-64": true, // موبایل full، دسکتاپ ثابت
            "translate-x-0": isOpen, // باز در موبایل
            "-translate-x-full md:translate-x-0": !isOpen, // در دسکتاپ همیشه باز
          }
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between md:justify-center mb-6 w-full">
          <Link href="/" onClick={handleClose}>
            <Image
              src="/images/Frame 20.png"
              alt="logo"
              width={80}
              height={80}
              className=" cursor-pointer"
            />
          </Link>

          {/* Close icon for mobile */}
          <button
            type="button"
            aria-label="Close Sidebar"
            onClick={handleClose}
            className="md:hidden text-white hover:text-gray-200 dark:text-secondary-300 dark:hover:text-secondary-100"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {/* Registered user links */}
        {isRegistered && (
          <div className="flex flex-col space-y-4 dark:text-secondary-200 font-medium pl-1">
            <Link href="/dashboard/profile" className="text-white hover:text-primary-100">
              Profile
            </Link>
            <Link href="/dashboard" className="text-white hover:text-primary-100">
              Dashboard
            </Link>
            <Link
              href="/dashboard/projectStart"
              className="text-white hover:text-primary-100"
            >
              Start
            </Link>
            <Link href="/dashboard/history" className="text-white hover:text-primary-100">
              History
            </Link>
            <Link href="/subscription" className="text-white hover:text-primary-100">
              Subscription
            </Link>
          </div>
        )}

        {/* Nav Links */}
        <nav className="space-y-4 dark:text-secondary-200 font-medium pl-1 mt-6">
          <Link
            href="/chat"
            className="flex items-center gap-2 text-white hover:text-primary-100"
            onClick={handleClose}
          >
            <IoChatbubblesOutline className="w-5 h-5" />
            Contact
          </Link>
          <Link
            href="/notifications"
            className="flex items-center gap-2 text-white hover:text-primary-100"
            onClick={handleClose}
          >
            <IoNotificationsOutline className="w-5 h-5" />
            Notifications
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-primary-100"
            onClick={handleClose}
          >
            <IoSearchOutline className="w-5 h-5" />
            Search
          </Link>
          <button
            type="button"
            className="flex items-center gap-2 text-white hover:text-primary-100"
            onClick={handleSignOut}
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
