"use client";
import React, { useEffect, useRef } from "react";
import type { IMessageDTO } from "@/lib/types";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: IMessageDTO[];
  selfId: string;
}

export default function MessageList({ messages, selfId }: MessageListProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100 dark:bg-secondary-700">
      {messages.length === 0 && (
        <div className="text-center text-gray-400 mt-10">
          No messages yet
        </div>
      )}

      {messages.map((msg) => (
        <MessageBubble
          key={msg._id}
          msg={msg}
          selfId={selfId}
          avatarUrl={msg.senderAvatar || "/images/avatardefault.png"}
        />
      ))}

      <div ref={endRef} />
    </div>
  );
}
