"use client";

import React from "react";
import clsx from "clsx";
import { IoChatbubbleEllipses, IoHome } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaClipboardQuestion } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import ThemeSwitcher from "@/components/modules/Theme/Theme";
import { IoBarChart } from "react-icons/io5";
import { IoExit } from "react-icons/io5";
import { MdOutlineQuiz } from "react-icons/md";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-white dark:bg-secondary-800 shadow-lg z-50 transition-transform duration-300",
          "lg:translate-x-0", // دسکتاپ همیشه باز
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex lg:flex-col items-center justify-between lg:justify-center p-4 mb-6">
          <Image
            src="/images/logo-black.png"
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
              href="/admin/chats"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
            >
              <IoChatbubbleEllipses size={20} />
              <span>Chats</span>
            </Link>
            <Link
              href="/admin/questionCreationForm/questions"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
            >
              <FaClipboardQuestion size={20} />
              <span>Questions</span>
            </Link>
            <Link
              href="/admin/firstQuizManager"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
            >
              <MdOutlineQuiz size={20} />
              <span>Base Quiz</span>
            </Link>
          </div>

          {/* ThemeSwitcher در موبایل */}
          <div className="flex flex-col  gap-3 mt-0 mb-44 pt-4 border-t border-gray-200 dark:border-secondary-700 ">
            <div className="flex items-center gap-3 lg:hidden">
              <ThemeSwitcher />
              Theme
            </div>
            <Link href="/" className="flex items-center gap-3 font-roboto">
              <IoExit className="size-5 font-bold text-black dark:text-white" />
              Sign Out
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
