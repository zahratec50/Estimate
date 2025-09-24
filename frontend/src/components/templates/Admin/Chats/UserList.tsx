"use client";

import React, { useMemo } from "react";
import clsx from "clsx";
import type { IUserDTO, IMessageDTO } from "@/lib/types";

interface UserListProps {
  users: IUserDTO[];
  messages: IMessageDTO[];
  selectedUserId: string | null;
  onSelectUser: (id: string) => void;
}

export default function UserList({ users, messages, selectedUserId, onSelectUser }: UserListProps) {
  // مرتب‌سازی کاربران: ادمین‌ها در بالا
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      if (a.role === "admin" && b.role !== "admin") return -1;
      if (a.role !== "admin" && b.role === "admin") return 1;
      return a.name.localeCompare(b.name);
    });
  }, [users]);

  // محاسبه پیام‌ها و unreadCount برای همه کاربران
  const userMessagesMap = useMemo(() => {
    const map: Record<string, { messages: IMessageDTO[]; lastMsg?: IMessageDTO; unreadCount: number }> = {};
    users.forEach((user) => {
      const userMessages = messages.filter((m) => m.senderId === user._id || m.receiverId === user._id);
      map[user._id] = {
        messages: userMessages,
        lastMsg: userMessages[userMessages.length - 1],
        unreadCount: userMessages.filter((m) => m.status !== "seen" && m.senderId !== "admin").length,
      };
    });
    return map;
  }, [users, messages]);

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow flex flex-col h-full overflow-y-auto">
      {sortedUsers.length === 0 && (
        <div className="p-4 text-center text-gray-500">No users found</div>
      )}

      {sortedUsers.map((user) => {
        const { lastMsg, unreadCount } = userMessagesMap[user._id] || { messages: [], unreadCount: 0 };

        return (
          <button
            key={user._id}
            className={clsx(
              "flex items-center gap-3 p-3 mx-2 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors rounded-xl border-l-4 border-transparent",
              selectedUserId === user._id && "bg-gray-100 dark:bg-neutral-700 border-l-neutral-500"
            )}
            onClick={() => onSelectUser(user._id)}
          >
            <img
              src={user.avatarUrl || "/images/user.png"}
              alt={user.name || "Unknown"}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 text-left min-w-0 overflow-hidden">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm truncate">{user.name || "Unknown"}</span>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs truncate mt-0.5">
                {lastMsg ? lastMsg.content.substring(0, 30) + "..." : "No messages yet"}
              </p>
              {lastMsg && (
                <p className="text-xs text-gray-400 truncate">
                  {new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}