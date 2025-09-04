"use client";

import React, { useEffect } from "react";
import clsx from "clsx";
import Sidebar from "@/components/templates/Admin/Sidebar";
import Topbar from "@/components/templates/Admin/Topbar";
import { useAppStore } from "@/store/useAppStore";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useAppStore();

  // بستن سایدبار با کلید ESC در موبایل
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSidebarOpen) closeSidebar();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isSidebarOpen, closeSidebar]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar + Overlay */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* محتوای اصلی */}
      <div
        className={clsx(
          "flex flex-col flex-1 min-w-0 h-full transition-all duration-300",
          "lg:ml-64" // همیشه فضای سایدبار در دسکتاپ ثابت می‌ماند
        )}
      >
        {/* Topbar ثابت */}
        <div className="sticky top-0 z-20">
          <Topbar onMenuClick={toggleSidebar} />
        </div>

        {/* محتوا با اسکرول */}
        <main className="flex-1 overflow-auto min-h-0 p-4 md:p-6 lg:p-10 bg-gray-200 dark:bg-muted">
          {children}
        </main>
      </div>
    </div>
  );
}
