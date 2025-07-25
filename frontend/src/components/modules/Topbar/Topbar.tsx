// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { TbHelpOctagon } from "react-icons/tb";
// import { IoSearchOutline, IoNotificationsOutline } from "react-icons/io5";

// const Topbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
//    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
//   const closeSidebar = () => setIsSidebarOpen(false);
//   return (
//     <header className="flex items-center justify-between px-2 py-3 sm:px-6 bg-primary-100">
//       {/* Logo + Mobile menu */}
//       <div className="flex items-center gap-2 md:hidden">
//         <button type="button" aria-label="Open menu" onClick={toggleSidebar}>
//           <svg
//             className="w-6 h-6 text-black"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.5"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
//             />
//           </svg>
//         </button>
//         <Image
//           src="/images/Logo.png"
//           alt="logo"
//           width={48}
//           height={48}
//           className="w-10 h-10"
//         />
//       </div>

//       {/* Desktop-only menu */}
//       <div className="hidden sm:flex items-center space-x-6 text-gray-600 text-sm md:text-base">
//         <span className="flex items-center">
//           <IoNotificationsOutline className="w-5 h-5 mr-1" />
//           Notifications
//         </span>
//         <span className="flex items-center">
//           <IoSearchOutline className="w-5 h-5 mr-1" />
//           Search
//         </span>
//         <span className="flex items-center">
//           <TbHelpOctagon className="w-5 h-5 mr-1" />
//           Help
//         </span>
//       </div>
//     </header>
//   );
// };

// export default Topbar;
// components/layout/Topbar.tsx
"use client";

import { IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import { TbHelpOctagon } from "react-icons/tb";
import Image from "next/image";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="flex items-center justify-between px-2 py-3 sm:px-6 bg-primary-100">
      {/* Mobile Menu Button + Logo */}
      <div className="flex items-center gap-2 md:hidden">
        <button type="button" aria-label="Open menu" onClick={onMenuClick}>
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <Image
          src="/images/Logo.png"
          alt="logo"
          width={48}
          height={48}
          className="w-10 h-10"
        />
      </div>

      {/* Desktop-only actions */}
      <div className="hidden sm:flex items-center space-x-6 text-gray-600 text-sm md:text-base">
        <span className="flex items-center">
          <IoNotificationsOutline className="w-5 h-5 mr-1" />
          Notifications
        </span>
        <span className="flex items-center">
          <IoSearchOutline className="w-5 h-5 mr-1" />
          Search
        </span>
        <span className="flex items-center">
          <TbHelpOctagon className="w-5 h-5 mr-1" />
          Help
        </span>
      </div>
    </header>
  );
}
