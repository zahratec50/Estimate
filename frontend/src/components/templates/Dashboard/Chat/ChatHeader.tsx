"use client";

import React, { useMemo } from "react";
import PresenceDot from "./PresenceDot";
import type { IUserDTO } from "@/lib/types";
import { FaPhone } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

export default function ChatHeader({
  peer,
  online,
  onMenuClick, // اضافه برای کنترل Sidebar
}: {
  peer: IUserDTO | null;
  online: boolean;
  onMenuClick: () => void; // Prop جدید
}) {
  const subtitle = useMemo(() => {
    if (!peer) return "";
    return online
      ? "Online now"
      : `Last seen: ${new Date(peer.lastSeen).toLocaleString()}`;
  }, [peer, online]);

  return (
    <header className="px-4 py-3 border-b-[3px] bg-white flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* دکمه منو فقط در موبایل */}
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <IoMenu size={24} />
        </button>

        <div
          className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
            peer?.name
              ? "bg-sky-200 font-semibold"
              : "bg-rose-200 font-extrabold"
          }`}
        >
          {peer?.name?.slice(0, 1) || "?"}
        </div>
        <div>
          <div
            className={`text-sm font-semibold ${
              peer?.name ? "" : "text-gray-400"
            }`}
          >
            {peer?.name && peer?.role
              ? `${peer?.name} (${
                  peer?.role.charAt(0).toUpperCase() +
                  peer?.role.slice(1).toLowerCase()
                })`
              : "Select a conversation"}
          </div>
          <div
            className={`text-xs text-gray-500 items-center gap-1 ${
              peer?.name ? "flex" : "hidden"
            }`}
          >
            <PresenceDot online={online} />
            <span>{subtitle}</span>
          </div>
        </div>
      </div>
      {peer?.phone && (
        <div className="text-xs text-gray-600">
          <a href={`tel:${peer.phone}`} className="hover:underline">
            <FaPhone className="size-4 inline-block mr-1" />
          </a>
        </div>
      )}
    </header>
  );
}
