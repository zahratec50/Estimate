"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IoClose,
  IoExitOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdOutlineQuestionMark } from "react-icons/md";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { AiOutlineHome, AiOutlineHistory } from "react-icons/ai";
import { BsClipboardData } from "react-icons/bs";
import { MdOutlineQuiz, MdLocalOffer } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import clsx from "clsx";
import { useAppStore } from "@/store/useAppStore";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

interface SidebarProps {
  isOpen?: boolean;
  isHelpOpen: boolean;
  onClose?: () => void;
  isHome?: boolean;
}

const Sidebar = ({
  isOpen: propsIsOpen,
  onClose: propsOnClose,
  isHelpOpen,
  isHome,
}: SidebarProps) => {
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);
  const isRegistered = useAppStore((state) => state.isRegistered);
  const setRegistered = useAppStore((state) => state.setRegistered);

  const isOpen = propsIsOpen ?? isSidebarOpen;
  const handleClose = propsOnClose ?? toggleSidebar;

  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    setRegistered(true);
    router.push(path);
    if (isSidebarOpen) toggleSidebar();
  };

  useEffect(() => {
    if (isSidebarOpen) handleClose();
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      await axios.post("/api/auth/signout");
      setRegistered(false);
      handleClose();
      router.push("/");
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
            "opacity-0 pointer-events-none": !isOpen || (!isOpen && !isHelpOpen),
          }
        )}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full flex flex-col justify-between p-4 bg-primary-500 shadow-lg z-50 transition-transform duration-300 w-2/3 md:w-64",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
            "lg:translate-x-0": !isHome && !isOpen,
          }
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between lg:justify-center mb-6 w-full">
          <Link href="/" onClick={handleClose}>
            <Image
              src="/images/Frame 20.png"
              alt="logo"
              width={80}
              height={80}
              className="cursor-pointer"
            />
          </Link>
          <button
            type="button"
            aria-label="Close Sidebar"
            onClick={handleClose}
            className="lg:hidden text-white hover:text-gray-200 dark:text-secondary-300 dark:hover:text-secondary-100"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {/* Registered user links */}
        {isRegistered && (
          <div className="flex flex-col space-y-4 dark:text-secondary-200 font-medium pl-1">
            <Link
              href="/"
              onClick={() => handleNavigation("/")}
              className="text-white hover:text-primary-100 flex gap-2"
            >
              <AiOutlineHome className="size-5" />
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-white hover:text-primary-100 flex gap-2"
            >
              <BsClipboardData className="size-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/projectStart"
              className="text-white hover:text-primary-100 flex gap-2"
            >
              <MdOutlineQuiz className="size-5" />
              New Estimate
            </Link>
            <Link
              href="/dashboard/profile"
              className="text-white hover:text-primary-100 flex gap-2"
            >
              <ImProfile className="size-5" />
              Profile
            </Link>
            <Link
              href="/dashboard/history"
              className="text-white hover:text-primary-100 flex gap-2"
            >
              <AiOutlineHistory className="size-5" />
              History
            </Link>
            <Link
              href="/subscription"
              className="text-white hover:text-primary-100 flex gap-2"
            >
              <MdLocalOffer className="size-5" />
              Subscription
            </Link>
          </div>
        )}

        {
          isHome && !isRegistered && (
            <div className="flex flex-col space-y-4 dark:text-secondary-200 font-medium pl-1 py-6">
            <Link
              href="#features"
              className="flex items-center gap-2 text-white hover:text-primary-100"
            >
              <AiOutlineFileDone className="size-5" />
              Features
            </Link>
            <Link
              href="#questions"
              className="flex items-center gap-2 text-white hover:text-primary-100"
            >
              <MdOutlineQuestionMark className="size-5" />
              Questions
            </Link>
            </div>
            
          )
        }
        <hr />
        {/* Nav Links */}
        <nav className="space-y-4 dark:text-secondary-200 font-medium pl-1 mt-6">
          <Link
            href="/chat"
            className="flex items-center gap-2 text-white hover:text-primary-100"
            onClick={handleClose}
          >
            <HiOutlineChatAlt2 className="w-5 h-5" />
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
            <IoExitOutline className="w-5 h-5" />
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
