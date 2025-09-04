"use client";
import React, { useState, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { useChatStore } from "@/store/chatStore";
import type { IMessageDTO } from "@/lib/types";

interface MessageInputProps {
  selfId: string;
  conversationId: string;
  onSendMessage?: (text: string) => Promise<void>;
}

export default function MessageInput({
  selfId,
  conversationId,
  onSendMessage,
}: MessageInputProps) {
  const [text, setText] = useState("");
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { self, addMessage } = useChatStore();

  const handleSend = async () => {
    const content = text.trim();
    if (!content) return;
    if (!self) return;

    const tmpMsg: IMessageDTO = {
      _id: `tmp-${Date.now()}`,
      conversationId,
      senderId: self!._id,
      receiverId: "mock-peer", // فقط برای mock
      senderName: self!.name,
      senderAvatar: "",
      content: text,
      createdAt: new Date().toISOString(),
      status: "sent",
    };

    addMessage(tmpMsg);

    setText("");
    try {
      if (onSendMessage) await onSendMessage(content);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-white dark:bg-secondary-600 border border-gray-300 rounded-full w-full max-w-3xl mx-auto mb-3">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message..."
        className="flex-1 px-3 py-2 text-sm md:text-lg outline-none rounded-full bg-gray-50 dark:bg-secondary-600 dark:placeholder:text-white"
      />
      <button
        aria-label="send"
        onClick={handleSend}
        className="p-2 rounded-full text-blue-500 dark:text-secondary-200 hover:text-blue-800 dark:hover:text-secondary-100 transition"
      >
        <IoMdSend className="w-8 h-8" />
      </button>
    </div>
  );
}
