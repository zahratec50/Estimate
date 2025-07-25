
// import React from 'react';
// import Sidebar from '@/components/modules/Sidebar/Sidebar';
// import Topbar from '@/components/modules/Topbar/Topbar';
// import clsx from 'clsx';

// const FirstQuizLayout: React.FC<{
//   children: React.ReactNode;
//   params: { numberPage: string };
// }> = ({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: { numberPage: string };
// }) => {
//   // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
//   // const closeSidebar = () => setIsSidebarOpen(false);

//   return (
//     <div className="flex h-fit min-h-screen bg-gray-50 relative overflow-x-hidden">
//       {/* Sidebar desktop */}
//       <Sidebar />

//       {/* Sidebar mobile overlay */}
//       {/* <div
//         className={clsx(
//           'fixed top-0 left-0 z-40 h-full w-64 bg-primary-200 p-4 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden',
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         )}
//       >
//         <Sidebar />
//       </div> */}

//       {/* Overlay when mobile sidebar is open */}
//       {/* {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
//           onClick={closeSidebar}
//         />
//       )} */}

//       {/* Main content */}
//       <div className="w-full md:ml-64 flex flex-col min-h-screen">
//         <Topbar  />
//         <main className="flex-1 px-2 sm:px-6 md:px-8 xl:px-10 py-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default FirstQuizLayout;

// app/(dashboard)/layout.tsx
import { ReactNode } from "react";
import ClientShell from "@/components/modules/ClientShell/ClientShell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ClientShell>
      {children}
    </ClientShell>
  );
}
