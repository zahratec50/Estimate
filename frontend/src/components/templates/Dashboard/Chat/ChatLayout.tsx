"use client";

import React, { useEffect, useMemo, useCallback, useState } from "react";
import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { getSocket } from "@/lib/socketClient";
import { useChatStore } from "@/store/chatStore";
import type { IMessageDTO, IConversationDTO, IUserDTO } from "@/lib/types";

const fetchSelf = async (): Promise<IUserDTO> => ({
  _id: "user-1",
  name: "John Doe",
  role: "User",
  phone: "+1 555 999 9999",
  status: "online",
  lastSeen: new Date().toISOString(),
});

const fetchPeers = async (): Promise<IUserDTO[]> => [
  { _id: "admin-1", name: "John Doe", role: "Admin", phone: "+1 555 999 9999", status: "offline", lastSeen: new Date().toISOString() },
  { _id: "admin-2", name: "John Smith", role: "Consultant", phone: "+1 555 999 1111", status: "online", lastSeen: new Date().toISOString() },
];

export default function ChatLayout() {
  const {
    self, setSelf, peers, setPeers,
    activeConversation, setActiveConversation,
    setMessages, addMessage, setTyping, setOnlineUsers,
    onlineUserIds, messages,
  } = useChatStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  // Bootstrap self & peers
  useEffect(() => {
    (async () => {
      const me = await fetchSelf();
      const plist = await fetchPeers();
      setSelf(me);
      setPeers(plist);
    })();
  }, [setSelf, setPeers]);

  // Ensure conversation with admin-1 once we have self & peers
  useEffect(() => {
    (async () => {
      if (!self || !peers.length) return;
      const adminId = peers[0]._id; // or select by UI
      const res = await fetch("/api/chat/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ members: [self._id, adminId] }),
      });
      if (!res.ok) return;
      const conv: IConversationDTO = await res.json();
      setActiveConversation(conv);
    })();
  }, [self, peers, setActiveConversation]);

  // Socket wiring
  useEffect(() => {
    if (!self) return;
    const socket = getSocket();
    socket.emit("join", { userId: self._id });

    socket.on("presenceUpdate", (ids: string[]) => setOnlineUsers(ids));
    socket.on("receiveMessage", (msg: IMessageDTO) => {
      if (activeConversation && msg.conversationId === activeConversation._id) {
        addMessage(msg);
      }
    });
    socket.on("typing", ({ userId, conversationId }: any) => {
      if (activeConversation && conversationId === activeConversation._id) setTyping(userId, true);
    });
    socket.on("stopTyping", ({ userId, conversationId }: any) => {
      if (activeConversation && conversationId === activeConversation._id) setTyping(userId, false);
    });

    return () => {
      socket.off("presenceUpdate");
      socket.off("receiveMessage");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [self, activeConversation, addMessage, setTyping, setOnlineUsers]);

  // Load messages when conversation changes
  useEffect(() => {
    (async () => {
      if (!activeConversation) return;
      const res = await fetch(`/api/chat/messages?conversationId=${activeConversation._id}`);
      const data: IMessageDTO[] = res.ok ? await res.json() : [];
      setMessages(data);
    })();
  }, [activeConversation, setMessages]);

  // Compute peer & online
  const peer = useMemo(() => {
    if (!activeConversation || !self) return null;
    const peerId = activeConversation.members.find((m) => m !== self._id);
    return peers.find((p) => p._id === peerId) || null;
  }, [activeConversation, self, peers]);
  const online = peer ? onlineUserIds.has(peer._id) : false;

  // Handle send (API + optimistic + optional socket)
  const handleSendMessage = useCallback(async (text: string) => {
    if (!self || !activeConversation) return;
    const receiverId = activeConversation.members.find((m) => m !== self._id);
    if (!receiverId) return;

    // optimistic
    const optimistic: IMessageDTO = {
      id: `tmp-${Date.now()}`,
      conversationId: activeConversation._id,
      senderId: self._id,
      receiverId,
      senderName: self.name,
      senderAvatar: "", // add if you have
      content: text,
      createdAt: new Date().toISOString(),
      status: "delivered",
    };
    addMessage(optimistic);

    // API
    const res = await fetch("/api/chat/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId: activeConversation._id,
        senderId: self._id,
        receiverId,
        content: text,
      }),
    });
    if (!res.ok) return; // keep optimistic, or rollback if needed

    const saved = await res.json();
    // normalize returned doc -> IMessageDTO
    const normalized: IMessageDTO = {
      id: saved._id ?? saved.id,
      conversationId: saved.conversationId,
      senderId: saved.senderId,
      receiverId: saved.receiverId,
      senderName: saved.senderId === self._id ? self.name : (peer?.name ?? "Unknown"),
      senderAvatar: "",
      content: saved.content,
      createdAt: saved.createdAt ?? new Date().toISOString(),
      status: saved.status ?? "delivered",
    };

    // optional: notify via socket (if سرور خودش broadcast نمی‌کنه)
    getSocket().emit("sendMessage", normalized);
  }, [self, activeConversation, addMessage, peer]);

  return (
    <div className="flex h-[calc(100vh-0px)] bg-gray-100 rounded-2xl overflow-hidden ">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <ChatHeader  onMenuClick={() => setIsSidebarOpen(true)} peer={null} online={false} />
        <MessageList messages={messages} selfId={self?._id || ""} />
        <div className="w-full flex items-center justify-center">
          <MessageInput
            selfId={self?._id || ""}
            conversationId={activeConversation?._id || ""}
            // onSendMessage={handleSendMessage}  // 👈 مهم
          />
        </div>
      </div>
    </div>
  );
}
