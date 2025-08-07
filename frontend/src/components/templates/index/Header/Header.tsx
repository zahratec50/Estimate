"use client";
import React from "react";
import { useAppStore } from "@/store/useAppStore";
import Topbar from "@/components/modules/Topbar/Topbar";
import Sidebar from "@/components/modules/Sidebar/Sidebar";

export default function Header() {
  const {
    isHelpOpen,
    toggleSidebar,
    toggleHelp,
    isSidebarOpen,
  } = useAppStore();

  return (
    <div>
      <div className="px-0 lg:px-20 bg-primary-200 dark:bg-secondary-700">
        <Topbar
        isHelpOpen={isHelpOpen}
        onHelpToggle={toggleHelp}
        onMenuClick={toggleSidebar}
        isHome={true}
      />
      </div>
      
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black-50/50">
          <div className="absolute left-0 top-0 w-64 h-full bg-white shadow-lg">
            <Sidebar
              isOpen={isSidebarOpen}
              isHelpOpen={isHelpOpen}
              onClose={toggleSidebar}
            />
          </div>
        </div>
      )}
    </div>
  );
}
