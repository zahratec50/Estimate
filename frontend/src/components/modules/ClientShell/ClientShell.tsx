// components/layout/ClientShell.tsx
"use client";

import { useState } from "react";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex flex-col flex-1">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-grow px-4 py-6 md:ml-64">{children}</main>
      </div>
    </div>
  );
}
