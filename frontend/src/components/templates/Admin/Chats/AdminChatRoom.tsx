"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { IMessageDTO } from "@/lib/types";
import { IoMdSend } from "react-icons/io";

interface AdminChatRoomProps {
  messages: IMessageDTO[];
  selfId: string;
  onSendMessage: (content: string) => void;
  loading?: boolean;
}

export default function AdminChatRoom({ messages, selfId, onSendMessage, loading }: AdminChatRoomProps) {
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // scroll to end after render
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  const handleSend = async () => {
    const text = newMessage.trim();
    if (!text || isSending) return;
    setIsSending(true);
    try {
      await onSendMessage(text);
      setNewMessage("");
    } catch (err) {
      console.error("Admin send error:", err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-secondary-800 rounded-xl shadow">
      <div className="flex-1 p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-secondary-700">
        {loading ? (
          <div className="text-center text-gray-400 mt-10">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">No messages yet</div>
        ) : (
          messages.map((msg) => {
            const mine = msg.senderId === selfId;
            return (
              <div key={msg._id || msg.tempId} className={clsx("flex w-full", mine ? "justify-end" : "justify-start")}>
                {!mine && (
                  <img
                    src={msg.senderAvatar || "/images/avataradmin.png"}
                    alt={msg.senderName || "Unknown"}
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                )}
                <div className={clsx("px-4 py-2 rounded-2xl shadow text-sm sm:text-base max-w-[85%] sm:max-w-[70%]",
                  mine ? "bg-primary-500 text-white" : "bg-gray-100 dark:bg-secondary-700")}>
                  {msg.content}
                  <div className="text-[10px] opacity-70 mt-1 text-right">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={endRef} />
      </div>

      <div className="flex items-center p-2 border border-gray-200 rounded-2xl dark:border-secondary-700 gap-2 w-full mx-auto dark:bg-secondary-700">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 outline-0 text-sm sm:text-base dark:bg-secondary-700"
        />
        <button
          onClick={handleSend}
          aria-label="send message"
          disabled={!newMessage.trim() || isSending}
          className="rounded-2xl font-medium hover:text-primary-300 dark:hover:text-gray-400 disabled:opacity-50"
        >
          <IoMdSend className="size-6 sm:size-7" />
        </button>
      </div>
    </div>
  );
}
