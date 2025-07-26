"use client";

import { useState } from "react";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className={`max-w-full flex flex-col flex-1 ${isHelpOpen ? 'mr-[320px]' : 'mr-0'}`}>
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} onHelpToggle={(open: boolean) => setIsHelpOpen(open)} />
        <main className="flex-grow md:px-20 xl:px-40 py-5 sm:py-20 md:ml-64">{children}</main>
      </div>
    </div>
  );
}

