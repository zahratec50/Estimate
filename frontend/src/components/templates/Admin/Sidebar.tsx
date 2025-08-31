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

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/50 z-40 transition-opacity md:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />

      <aside
        className={clsx(
          "fixed top-0 left-0 min-h-screen bg-white dark:bg-secondary-800 shadow-lg z-50 transition-all duration-300",
          "md:fixed md:w-64 md:translate-x-0",
          isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
        )}
      >
        <div className="flex flex-col min-h-screen p-4 w-64">
          {/* Sidebar Header */}
          <div className="flex md:flex-col items-center justify-between md:justify-center mb-6">
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
              aria-label="close sidebar"
              className="text-xl text-gray-500 hover:text-gray-700 md:hidden"
            >
              <IoMdClose />
            </button>
          </div>

          {/* Search only on mobile */}
          <div className="md:hidden mb-4 relative">
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-10 w-full" />
          </div>

          {/* Menu */}
          <nav className="h-full flex flex-col justify-between">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
              >
                <IoHome size={20} />
                <span>Home</span>
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
            </div>

            <div className="md:hidden flex items-center gap-3 mt-auto pt-4 border-t border-gray-200 dark:border-secondary-700">
              <ThemeSwitcher />
              Theme
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
