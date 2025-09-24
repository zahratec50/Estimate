"use client";

import React from "react";
import type { IMessageDTO } from "@/lib/types";

interface MessageBubbleProps {
  msg: IMessageDTO;
  selfId: string;
  avatarUrl?: string;
}

export default function MessageBubble({
  msg,
  selfId,
  avatarUrl,
}: MessageBubbleProps) {
  const mine = msg.senderId === selfId;

  return (
    <div className="flex w-full max-w-7xl justify-end">
      <div
        className={`flex flex-col w-full px-2 mb-3 items-end ${
          mine ? "justify-end" : "justify-start"
        }`}
      >
        <div className="flex items-end justify-end gap-3">
          {mine && avatarUrl && (
            <img
              src={avatarUrl ? avatarUrl : "/images/avataradmin.png"}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0 order-1"
            />
          )}

          <div
            className={`relative px-4 py-2 rounded-full shadow-md text-sm leading-relaxed whitespace-pre-wrap break-words overflow-hidden max-w-[70%] ${
              mine
                ? "bg-indigo-700 text-white dark:bg-indigo-300 dark:text-secondary-900 rounded-br-none"
                : "bg-secondary-400 text-gray-900 rounded-bl-none"
            }`}
          >
            {msg.content}

            {msg.attachments?.length ? (
              <div className="mt-2 space-y-1 break-words">
                {msg.attachments.map((a, i) => (
                  <a
                    key={i}
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {a.name || "Attachment"} (
                    {a.size ? Math.round(a.size / 1024) + " KB" : "Unknown"})
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="text-[10px] mr-14 mt-1 text-gray-400 dark:text-gray-700">
          {new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
