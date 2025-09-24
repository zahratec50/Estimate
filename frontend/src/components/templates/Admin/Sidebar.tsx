"use client";

import React, { useEffect } from "react";
import clsx from "clsx";
import { IoExit, IoBarChart, IoHome } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaClipboardQuestion } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import ThemeSwitcher from "@/components/modules/Theme/Theme";
import { TbPlaylistAdd } from "react-icons/tb";
import { IoMdChatbubbles } from "react-icons/io";
import { MdOutlineQuiz } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { useAdminChatStore } from "@/store/adminChatStore";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isHome?: boolean;
}

export default function SidebarAdmin({
  isOpen,
  onClose,
  isHome,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = useAppStore((state) => state.toggleSidebar);
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);

  //  تعداد یکتای کاربران با پیام‌های خوانده‌نشده
  const { messages, adminSelf } = useAdminChatStore();

  const unreadSenders = React.useMemo(() => {
    const allMsgs = Object.values(messages).flat();
    const uniqueSenders = new Set<string>();
    allMsgs.forEach((msg) => {
      if (msg.senderId !== adminSelf?._id && msg.status !== "seen") {
        uniqueSenders.add(msg.senderId);
      }
    });
    return Array.from(uniqueSenders);
  }, [messages, adminSelf?._id]);

  const handleClose = onClose ?? toggleSidebar;

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isSidebarOpen) toggleSidebar();
  };

  useEffect(() => {
    if (isSidebarOpen) handleClose();
  }, [pathname]);

  const handleHome = () => {
    handleNavigation("/");
    if (isSidebarOpen) handleClose();
  };

  const handleSignOut = async () => {
    try {
      await axios.post("/api/auth/signout");
      router.push("/"); // ریدایرکت به صفحه اصلی
      if (isSidebarOpen) toggleSidebar();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };
  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden",
          {
            "opacity-100 pointer-events-auto": isOpen,
            "opacity-0 pointer-events-none": !isOpen,
          }
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-white dark:bg-secondary-800 shadow-lg z-50 transition-transform duration-300",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
            "lg:translate-x-0": !isHome && !isOpen,
          }
        )}
      >
        {/* Header */}
        <div className="flex lg:flex-col items-center justify-between lg:justify-center p-4 mb-6">
          <Image
            src="/images/logoBlack.png"
            alt="Logo"
            width={60}
            height={60}
            className="flex dark:hidden"
          />
          <Image
            src="/images/Frame 20.png"
            alt="Logo"
            width={60}
            height={60}
            className="hidden dark:flex"
          />
          <button
            onClick={onClose}
            aria-label="Close Sidebar"
            className="text-xl text-gray-500 hover:text-gray-700 lg:hidden"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Search برای موبایل */}
        <div className="md:hidden mb-4 relative px-4">
          <CiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-10 w-full" />
        </div>

        {/* Menu */}
        <nav className="h-full flex flex-col justify-between px-4">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={handleHome}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
            >
              <IoHome size={20} />
              <span>Home</span>
            </Link>
            <Link
              href="/admin"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
            >
              <IoBarChart size={20} />
              <span>Data</span>
            </Link>
            <Link
              href="/admin/questionCreationForm/questions"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
            >
              <FaClipboardQuestion size={20} />
              <span>Questions</span>
            </Link>
            <Link
              href="/admin/questionCreationForm"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
            >
              <TbPlaylistAdd size={20} />
              <span>Create Questions</span>
            </Link>
            <Link
              href="/admin/firstQuizManager"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
            >
              <MdOutlineQuiz size={20} />
              <span>Base Quiz</span>
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
            >
              <MdGroupAdd size={20} />
              <span>users</span>
            </Link>
            <Link
              href="/admin/chats"
              className="relative flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
            >
              <IoMdChatbubbles size={20} />
              <span>Chats</span>

              {unreadSenders.length > 0 && (
                <span className="absolute top-2 right-3 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full" />
              )}
            </Link>
          </div>

          {/* ThemeSwitcher در موبایل */}
          <div className="flex flex-col  gap-3 mt-0 mb-44 pt-4 border-t border-gray-200 dark:border-secondary-700 ">
            <div className="flex items-center gap-3 lg:hidden">
              <ThemeSwitcher />
              Theme
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 font-roboto"
            >
              <IoExit className="size-5 font-bold text-black dark:text-white" />
              Sign Out
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
