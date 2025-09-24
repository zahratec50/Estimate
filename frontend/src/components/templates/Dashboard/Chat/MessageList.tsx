"use client";

import React, { useEffect, useRef } from "react";
import type { IMessageDTO } from "@/lib/types";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: IMessageDTO[];
  selfId: string;
  initialScrollDone: boolean;
  setInitialScrollDone: (val: boolean) => void;
}

const MessageList = React.memo(({ messages, selfId, initialScrollDone, setInitialScrollDone }: MessageListProps) => {
  const endRef = useRef<HTMLDivElement | null>(null);

  // اسکرول فقط بار اول
  useEffect(() => {
    if (!initialScrollDone && messages.length) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
      setInitialScrollDone(true);
    }
  }, [messages, initialScrollDone, setInitialScrollDone]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100 dark:bg-secondary-900">
      {messages.length === 0 && <div className="text-center text-gray-400 mt-10">No messages yet</div>}

      {messages.map((msg, index) => (
        <MessageBubble
          key={msg._id || msg.tempId || `fallback-${index}`}
          msg={msg}
          selfId={selfId}
          avatarUrl={msg.senderAvatar || "/images/avataradmin.png"}
        />
      ))}

      <div ref={endRef} />
    </div>
  );
});

export default MessageList;
