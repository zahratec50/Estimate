"use client";

import React from "react";
import clsx from "clsx";
import Sidebar from "@/components/templates/Admin/Sidebar";
import Topbar from "@/components/templates/Admin/Topbar";
import { useAppStore } from "@/store/useAppStore";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, toggleSidebar } = useAppStore();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar ثابت */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-full z-30 transition-transform duration-300",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      </div>

      {/* محتوای اصلی */}
      <div
        className={clsx(
          "flex flex-col flex-1 min-w-0 h-full transition-all duration-300",
          isSidebarOpen ? "md:ml-64" : "md:ml-64" // فضای سایدبار در دسکتاپ
        )}
      >
        {/* Topbar ثابت */}
        <div className="sticky top-0 z-20">
          <Topbar onMenuClick={toggleSidebar} />
        </div>

        {/* محتوا با اسکرول */}
        <main className="flex-1 overflow-auto min-h-0 p-4 md:p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
