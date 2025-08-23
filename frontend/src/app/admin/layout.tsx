"use client";

import React from "react";
import clsx from "clsx";
import Sidebar from "@/components/templates/Admin/Sidebar";
import Topbar from "@/components/templates/Admin/Topbar";
import { useAppStore } from "@/store/useAppStore";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, toggleSidebar } = useAppStore();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-secondary-900">
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      <div
        className={clsx(
          "flex flex-col flex-1 transition-all duration-300",
          isSidebarOpen ? "" : ""
        )}
      >
        <Topbar onMenuClick={toggleSidebar} />

        <main className="flex-grow p-4 md:p-6 lg:p-10 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
