"use client";
import React, {useEffect} from "react";
import { useAppStore } from "@/store/useAppStore";
import Topbar from "@/components/modules/Topbar/Topbar";
import Sidebar from "@/components/modules/Sidebar/Sidebar";
import SidebarAdmin from "@/components/templates/Admin/Sidebar";

export default function Header() {
  const isSidebarOpen = useAppStore((s) => s.isSidebarOpen);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const isHelpOpen = useAppStore((s) => s.isHelpOpen);
  const toggleHelp = useAppStore((s) => s.toggleHelp);
  const role = useAppStore((s) => s.role);

  useEffect(() => {
    if(isSidebarOpen) toggleSidebar();
  }, []);

  return (
    <>
      <div className="px-0 lg:px-20 bg-primary-500 dark:bg-secondary-700">
        <Topbar
          isHelpOpen={isHelpOpen}
          onHelpToggle={toggleHelp}
          onMenuClick={toggleSidebar}
          isHome={true}
        />
      </div>

      {/* ✅ Sidebar همیشه در DOM هست */}
      {role === "admin" ? (
        <SidebarAdmin isOpen={isSidebarOpen} onClose={toggleSidebar} isHome={true} />
      ) : (
        <Sidebar
          isOpen={isSidebarOpen}
          isHelpOpen={isHelpOpen}
          onClose={toggleSidebar}
          isHome={true}
        />
      )}

      {/* ✅ Overlay جدا */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 z-40 bg-blackNew-50/50 transition-opacity duration-300 lg:hidden
          ${
            isSidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
      />
    </>
  );
}
