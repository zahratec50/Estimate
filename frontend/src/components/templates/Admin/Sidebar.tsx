"use client";

import React from "react";
import clsx from "clsx";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Overlay فقط در موبایل وقتی منو باز است */}
      <div
        className={clsx(
          "fixed inset-0 bg-black-50/40 z-40 transition-opacity md:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />

      <aside
        className={clsx(
          "fixed top-0 left-0 min-h-screen bg-white dark:bg-secondary-800 shadow-lg z-50 transition-all duration-300",
          "md:static md:translate-x-0 md:w-64", // حالت دسکتاپ
          isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64" // حالت موبایل
        )}
      >
        <div className="flex flex-col h-full p-4 w-64">
          {/* هدر سایدبار */}
          <div className="flex md:flex-col items-center justify-between md:justify-center mb-6">
            
              <Image
                src="/images/logo-Black.png"
                alt="Logo"
                width={60}
                height={60}
              />
              

            <button
              onClick={onClose}
              aria-label="close sidebar"
              className="text-xl text-gray-500 hover:text-gray-700 md:hidden"
            >
              <IoMdClose />
            </button>
          </div>

          {/* منوها */}
          <nav className="flex flex-col gap-1">
            <Link href="/" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700">
              <IoHome size={20} />
              <span>Home</span>
            </Link>
            <Link href="/admin/chats" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700">
              <IoChatbubbleEllipses size={20} />
              <span>Chats</span>
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}
