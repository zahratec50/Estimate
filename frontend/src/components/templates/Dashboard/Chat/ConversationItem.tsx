"use client";
import React from "react";
import PresenceDot from "./PresenceDot";
import type { IUserDTO } from "@/lib/types";

interface ConversationItemProps {
  peer: IUserDTO;
  active: boolean;
  onClick: () => void;
  online: boolean;
}

export default function ConversationItem({ peer, active, onClick, online }: ConversationItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-left transition-colors duration-200
        ${active ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-600"}`}
    >
      <div className="relative">
        <div
          className={`w-10 h-10 rounded-2xl flex items-center justify-center font-semibold text-white
            ${peer.name ? "bg-sky-400" : "bg-gray-400"}`}
        >
          {peer.name?.slice(0, 1) || "?"}
        </div>
        <span className="absolute -bottom-0 -right-2">
          <PresenceDot online={online} />
        </span>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="text-sm font-medium text-gray-900 dark:text-white">{peer.name || "Unknown"}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {peer.role ? peer.role.charAt(0).toUpperCase() + peer.role.slice(1) : "-"}
        </div>
      </div>
    </button>
  );
}
