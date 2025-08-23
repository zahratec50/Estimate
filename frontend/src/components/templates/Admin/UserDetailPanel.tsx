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
