"use client";

import React from "react";
import { IUser, IMessage } from "@/store/adminChatStore";
import clsx from "clsx";

interface UserListProps {
  users: IUser[];
  messages: IMessage[];
  selectedUserId: string | null;
  onSelectUser: (id: string) => void;
}

export default function UserList({ users, messages, selectedUserId, onSelectUser }: UserListProps) {
  return (
    <div className="bg-white dark:bg-secondary-800 rounded-xl shadow flex flex-col h-full overflow-y-auto">
      {users.length === 0 && (
        <div className="p-4 text-center text-gray-500">No users found</div>
      )}

      {users.map((user) => {
        const lastMsg = messages
          .filter((m) => m.senderId === user._id || m.receiverId === user._id)
          .slice(-1)[0];

        return (
          <button
            key={user._id}
            className={clsx(
              "flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors rounded-xl",
              selectedUserId === user._id && "bg-gray-100 dark:bg-secondary-700"
            )}
            onClick={() => onSelectUser(user._id)}
          >
            <img
              src={user.avatar || "/images/user.png"}
              alt={user.name || "Unknown"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 text-left overflow-hidden">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm truncate">
                  {user.name || "Unknown"}
                </span>
                {user.unreadCount && user.unreadCount > 0 && (
                  <span className="bg-primary-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {user.unreadCount}
                  </span>
                )}
              </div>
              <p className="text-gray-500 dark:text-gray-300 text-xs truncate">
                {lastMsg ? lastMsg.content : "No messages"}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
