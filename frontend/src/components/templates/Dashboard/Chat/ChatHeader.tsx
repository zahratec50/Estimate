"use client";
import React, { useMemo } from "react";
import { IoMenu } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import PresenceDot from "./PresenceDot";
import type { IUserDTO } from "@/lib/types";

interface ChatHeaderProps {
  peer: IUserDTO | null;
  online: boolean;
  onMenuClick: () => void;
}

export default function ChatHeader({ peer, online, onMenuClick }: ChatHeaderProps) {
  const subtitle = useMemo(() => {
    if (!peer) return "";
    return peer.status === "online"
      ? "Online now"
      : peer.lastSeen
        ? `Last seen: ${new Date(peer.lastSeen).toLocaleString()}`
        : "Last seen: unknown";
  }, [peer]);

  return (
    <header className="px-4 py-3 border-b-[3px] bg-white dark:bg-neutral-900 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
        >
          <IoMenu size={24} className="text-gray-700 dark:text-gray-200" />
        </button>
        <div
          className={`w-10 h-10 rounded-2xl flex items-center justify-center 
            ${peer?.name ? "bg-sky-200 dark:bg-sky-800" : "bg-rose-200 dark:bg-rose-800"}`}
        >
          <span className="text-gray-700 dark:text-gray-100">
            {peer?.name?.charAt(0) || "?"}
          </span>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {peer?.name || "Select a conversation"}
          </div>
          {peer && (
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <PresenceDot online={online} />
              <span>{subtitle}</span>
            </div>
          )}
        </div>
      </div>
      {peer?.phone && (
        <div className="text-xs text-gray-600 dark:text-gray-300">
          <a href={`tel:${peer.phone}`} className="hover:underline">
            <FaPhone className="size-5 inline-block mr-1" />
          </a>
        </div>
      )}
    </header>
  );
}
