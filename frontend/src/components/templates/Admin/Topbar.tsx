// "use client";

// import React from "react";
// import { IoMenu } from "react-icons/io5";

// export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
//   return (
//     <header className="flex items-center justify-between bg-white dark:bg-secondary-800 p-4 shadow-md border-b border-gray-300">
//       <button
//       title="message"
//         className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
//         onClick={onMenuClick}
//       >
//         <IoMenu size={24} />
//       </button>
//       <h1 className="text-xl font-semibold">Admin Dashboard</h1>
//     </header>
//   );
// }

"use client";

import React from "react";
import { IoMenu } from "react-icons/io5";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="flex items-center justify-between bg-white dark:bg-secondary-800 p-4 shadow-md border-b border-gray-300">
      {/* دکمه منو فقط در موبایل نمایش داده می‌شود */}
      <button
        title="Toggle Menu"
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
        onClick={onMenuClick}
      >
        <IoMenu size={24} />
      </button>
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
    </header>
  );
}
