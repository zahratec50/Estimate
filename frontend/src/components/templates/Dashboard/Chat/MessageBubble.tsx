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
  console.log(mine);
  

  return (
    <div
      className={`flex w-full mb-3 items-end ${
        mine ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar for received messages */}
      {!mine && avatarUrl && (
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover mr-2"
        />
      )}

      <div
        className={`relative px-4 py-2 rounded-full max-w-[75%] shadow-md break-words 
        text-sm leading-relaxed transition-all duration-200
        ${mine
          ? "bg-gray-900 text-white rounded-br-none"
          : "bg-gray-300 text-gray-900 rounded-bl-none"
        }`}
      >
        {/* Message Content */}
        <div>{msg.content}</div>

        {/* Attachments */}
        {msg.attachments && msg.attachments.length > 0 && (
          <div className="mt-2 space-y-1">
            {msg.attachments.map((a, i) => (
              <a
                key={i}
                href={a.url}
                target="_blank"
                className="text-xs block text-blue-600 underline break-words hover:text-blue-800"
              >
                {a.name} ({Math.round(a.size / 1024)} KB)
              </a>
            ))}
          </div>
        )}

        {/* Timestamp + Status */}
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
          className="w-8 h-8 rounded-full object-cover ml-2"
        />
      )}
    </div>
  );
}
