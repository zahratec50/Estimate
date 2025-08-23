"use client";

import React, { useState } from "react";
import { getSocket } from "@/lib/socketClient";
import { useChatStore } from "@/store/chatStore";
import { IMessageDTO } from "@/lib/types";
import { IoMdSend } from "react-icons/io";

interface MessageInputProps {
  selfId: string;
  conversationId: string;
}

export default function MessageInput({
  selfId,
  conversationId,
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const { self, activeConversation, addMessage } = useChatStore();

  if (!self || !activeConversation) return null;

  const receiverId = activeConversation.members.find((id) => id !== self._id);

  const handleSend = async () => {
    if (!message.trim() || !receiverId) return;

    const msg: IMessageDTO = {
      id: `msg-${Date.now()}`,
      senderId: selfId,
      receiverId,
      conversationId,
      senderName: self.name || "Unknown",
      senderAvatar: "",
      content: message.trim(),
      createdAt: new Date().toISOString(),
      status: "sent",
    };

    try {
      addMessage(msg);

      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: msg.conversationId,
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          content: msg.content,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message to API");

      const savedMsg = await res.json();

      const socket = getSocket();
      socket.emit("sendMessage", savedMsg);

      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleTyping = (isTyping: boolean) => {
    const socket = getSocket();
    socket.emit(isTyping ? "typing" : "stopTyping", {
      userId: self._id,
      conversationId: activeConversation._id,
    });
  };

  return (
    <div
      className="
        flex items-center p-2 bg-white border border-gray-300 rounded-full gap-2
        focus-within:border-gray-400 mb-2
        w-full
        max-w-3xl
        mx-auto
        sm:mx-4
        md:mx-8
      "
    >
      <input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          handleTyping(!!e.target.value);
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message..."
        className="
          flex-1 px-4 py-2 outline-0 text-sm
          sm:text-base
        "
      />
      <button
        aria-label="Send message"
        onClick={handleSend}
        className="rounded-2xl text-primary-500 font-medium hover:text-primary-400"
      >
        <IoMdSend className="size-6 sm:size-7" />
      </button>
    </div>
  );
}
