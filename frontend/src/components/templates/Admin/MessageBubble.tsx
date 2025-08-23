"use client";

import React from "react";
import clsx from "clsx";
import type { IMessageDTO } from "@/lib/types";

export default function MessageBubble({
  msg,
  selfId,
}: {
  msg: IMessageDTO;
  selfId: string;
}) {
  const mine = msg.senderId === selfId;

  return (
    <div className={clsx("flex w-full mb-2", mine ? "justify-end" : "justify-start")}>
      {!mine && (
        <img
          src={msg.senderAvatar}
          alt={msg.senderName}
          className="w-8 h-8 rounded-full object-cover mr-2"
        />
      )}
      <div
        className={clsx(
          "px-4 py-2 rounded-2xl shadow max-w-[70%] break-words",
          mine
            ? "bg-primary-500 text-white rounded-br-none"
            : "bg-gray-100 dark:bg-secondary-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
        )}
      >
        {msg.content}
        <div className="text-[10px] mt-1 opacity-70 text-right">
          {new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
