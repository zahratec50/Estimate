"use client";
import React, { useState, useRef, useEffect } from "react";
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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { self, addMessage } = useChatStore();
  const [isSending, setIsSending] = useState(false);

  // اتو ریسایز برای textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // set new height
    }
  }, [text]);

  const handleSend = async () => {
    const content = text.trim();
    if (!content || !self || isSending) return;

    setIsSending(true); // قفل‌کردن ارسال
    const tmpMsg: IMessageDTO = {
      _id: `tmp-${Date.now()}`,
      conversationId,
      senderId: self._id,
      receiverId: "mock-peer",
      senderName: self.name,
      senderAvatar: "",
      content,
      createdAt: new Date().toISOString(),
      status: "sent",
    };

    addMessage(tmpMsg);
    setText("");

    try {
      if (onSendMessage) await onSendMessage(content);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false); // آزادکردن قفل
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-3xl mx-auto mb-3">
      <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-black transition">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 resize-none bg-transparent text-sm md:text-base outline-none placeholder-gray-400 dark:placeholder-gray-300 text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words"
        />
        <button
          aria-label="send"
          onClick={handleSend}
          disabled={!text.trim()}
          className={`p-2 rounded-full transition ${
            text.trim()
              ? "text-indigo-500 hover:bg-indigo-50 dark:hover:bg-neutral-700 hover:text-indigo-700"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          <IoMdSend className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
