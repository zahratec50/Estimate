"use client";
import React from "react";
import type { IMessageDTO } from "@/lib/types";

export default function MessageBubble({
  msg,
  selfId,
  avatarUrl,
}: {
  msg: IMessageDTO;
  selfId: string;
  avatarUrl?: string;
}) {
  const mine = msg.senderId === selfId;

  return (
    <div className="flex items-center justify-end w-full max-w-sm sm:max-w-3xl md:max-w-xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
      <div
        className={`flex w-full h-full px-2 mb-3 items-end overflow-x-hidden ${
          mine ? "justify-end" : "justify-start"
        }`}
      >
        {/* Avatar for received messages */}
        {!mine && avatarUrl && (
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0"
          />
        )}

        <div
          className={`relative px-4 py-2 rounded-full shadow-md text-sm leading-relaxed
          whitespace-pre-wrap break-words overflow-hidden max-w-[70%] sm:max-w-[60%] md:max-w-[55%] lg:max-w-[50%]
          ${
            mine
              ? "bg-indigo-700 text-white dark:bg-indigo-300 dark:text-secondary-900 rounded-br-none"
              : "bg-secondary-400 text-gray-900 rounded-bl-none"
          }`}
        >
          {msg.content}

          {/* ضمیمه‌ها */}
          {msg.attachments && msg.attachments.length > 0 && (
            <div className="mt-2 space-y-1 break-words">
              {msg.attachments.map((a, i) => (
                <a
                  key={i}
                  href={a.url}
                  target="_blank"
                  className="text-xs block text-indigo-600 underline break-words hover:text-indigo-800"
                >
                  {a.name} ({Math.round(a.size / 1024)} KB)
                </a>
              ))}
            </div>
          )}

          {/* زمان و وضعیت */}
          <div className="text-[10px] opacity-70 mt-1 flex justify-end items-center gap-1">
            <span>
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {mine && (
              <span>
                {msg.status === "seen"
                  ? "✓✓"
                  : msg.status === "delivered"
                  ? "✓"
                  : "…"}
              </span>
            )}
          </div>
        </div>

        {/* Avatar for sent messages */}
        {mine && avatarUrl && (
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover ml-2 flex-shrink-0"
          />
        )}
      </div>
    </div>
  );
}
