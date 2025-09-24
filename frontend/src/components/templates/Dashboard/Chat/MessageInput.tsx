"use client";

import React, { useState, useRef, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import { useQuestionStore } from "@/store/useQuestionStore";

interface MessageInputProps {
  selfId: string;
  conversationId: string;
  onSendMessage: (text: string) => Promise<void>;
}

export default function MessageInput({ selfId, conversationId, onSendMessage }: MessageInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { addQuestion } = useQuestionStore();

  // مدیریت auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  }, [text]);

  // مدیریت رویداد تایپینگ با API
  useEffect(() => {
    if (text.trim() && !isTyping) {
      setIsTyping(true);
      fetch("/api/chat/typing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ conversationId, userId: selfId, isTyping: true }),
      }).catch((err) => console.error("Typing API error:", err));
    } else if (!text.trim() && isTyping) {
      setIsTyping(false);
      fetch("/api/chat/typing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ conversationId, userId: selfId, isTyping: false }),
      }).catch((err) => console.error("Typing API error:", err));
    }
  }, [text, isTyping, selfId, conversationId]);

  const handleSend = async () => {
    const content = text.trim();
    if (!content || isSending) return;

    setIsSending(true);
    try {
      await onSendMessage(content);
      addQuestion({
        id: `q-${Date.now()}`,
        text: content,
        askedAt: new Date().toISOString(),
        userId: selfId,
      });
      setText("");
    } catch (err: any) {
      console.error("Send message error:", err.message);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-3 px-4">
      <div className="flex items-end gap-2 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          disabled={isSending}
          className="flex-1 resize-none bg-transparent md:text-lg outline-none placeholder-gray-400 dark:placeholder-gray-300 text-gray-800 dark:text-gray-100 max-h-24 overflow-y-auto mb-1"
        />
        <button
          onClick={handleSend}
          disabled={!text.trim() || isSending}
          className={`p-2 rounded-full transition-colors disabled:opacity-50 ${
            text.trim() && !isSending
              ? "text-indigo-500 hover:bg-indigo-50 dark:hover:bg-neutral-700"
              : "text-gray-400"
          }`}
          aria-label="Send message"
        >
          <IoMdSend className={`w-5 h-5 transition-transform ${isSending ? "animate-spin" : ""}`} />
        </button>
      </div>
    </div>
  );
}