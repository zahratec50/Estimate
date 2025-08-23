"use client";
import React from "react";
import PresenceDot from "./PresenceDot";
import type { IUserDTO } from "@/lib/types";

export default function ConversationItem({
  peer,
  active,
  onClick,
  online,
}: {
  peer: IUserDTO;
  active: boolean;
  onClick: () => void;
  online: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-left hover:bg-gray-100 ${
        active ? "bg-gray-100" : ""
      }`}
    >
      <div className="relative">
        <div className="w-10 h-10 rounded-2xl bg-gray-200 flex items-center justify-center font-semibold">
          {peer.name.slice(0, 1)}
        </div>
        <span className="absolute -bottom-0 -right-2">
          <PresenceDot online={online} />
        </span>
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">{peer.name}</div>
        <div className="text-xs text-gray-500">
          {peer.role}
        </div>
      </div>
    </button>
  );
}
