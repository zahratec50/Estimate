// "use client";

// import React from "react";
// import clsx from "clsx";
// import type { IMessageDTO } from "@/lib/types";

// interface UserDetailPanelProps {
//   user: { id: string; name: string; avatar: string; phone?: string };
// }

// export default function UserDetailPanel({ user }: UserDetailPanelProps) {
//   return (
//     <aside className="w-80 bg-white dark:bg-secondary-800 shadow-xl p-4 flex flex-col">
//       <div className="flex flex-col items-center gap-3 mb-6">
//         <img
//           src={user.avatar}
//           alt={user.name}
//           className="w-20 h-20 rounded-full object-cover"
//         />
//         <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{user.name}</h2>
//         {user.phone && (
//           <p className="text-sm text-gray-500 dark:text-gray-300">{user.phone}</p>
//         )}
//       </div>

//       <div className="flex-1">
//         <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
//           User Info
//         </h3>
//         {/* Add more user details if needed */}
//         <div className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
//           <p>ID: {user.id}</p>
//         </div>
//       </div>
//     </aside>
//   );
// }

"use client";

import React from "react";
import clsx from "clsx";

interface UserDetailPanelProps {
  user: {
    _id: string;
    name?: string;
    avatar?: string;
    phone?: string;
    email?: string;
    role?: string;
    lastSeen?: string;
  };
}

export default function UserDetailPanel({ user }: UserDetailPanelProps) {
  return (
    <div className="hidden lg:flex flex-col bg-white dark:bg-secondary-800 rounded-xl shadow p-4 w-[320px]">
      <div className="flex flex-col items-center mb-4">
        <img
          src={user.avatar || "/avatars/default.png"}
          alt={user.name || "Unknown"}
          className="w-16 h-16 rounded-full object-cover mb-2"
        />
        <h2 className="text-lg font-medium text-center truncate">
          {user.name || "Unknown"}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {user.role || "User"}
        </p>
      </div>
      <div className="flex flex-col gap-3 text-sm">
        <div>
          <span className="font-medium">Phone: </span>
          <span>{user.phone || "N/A"}</span>
        </div>
        <div>
          <span className="font-medium">Email: </span>
          <span>{user.email || "N/A"}</span>
        </div>
        <div>
          <span className="font-medium">Last Seen: </span>
          <span>
            {user.lastSeen
              ? new Date(user.lastSeen).toLocaleString()
              : "Unknown"}
          </span>
        </div>
      </div>
      <div className="mt-auto text-center text-gray-400 text-xs">
        Admin Panel
      </div>
    </div>
  );
}
