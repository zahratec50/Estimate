"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useChatStore, socket } from "@/store/chatStore";
import type { IUserDTO, IMessageDTO, IConversationDTO } from "@/lib/types";

export default function ChatLayout() {
  const { self, setSelf, peers, setPeers, activeConversation, setActiveConversation, messages, addMessage, setOnlineUsers, typingBy, onlineUserIds } = useChatStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock fetch self & peers
  useEffect(() => {
    setSelf({ _id: "user-1", name: "John", role: "User", phone: "+15559999999", status: "online", lastSeen: new Date().toISOString() });
    setPeers([
      { _id: "admin-1", name: "Emily Johnson", role: "Admin", phone: "+15551111111", status: "online", lastSeen: new Date().toISOString() },
      { _id: "consult-1", name: "Sarah Miller", role: "Consultant", phone: "+15552222222", status: "offline", lastSeen: new Date().toISOString() }
    ]);
  }, [setSelf, setPeers]);

  // Mock active conversation
  useEffect(() => {
    if (!self || !peers.length) return;
    const conv: IConversationDTO = {
    _id: [self._id, peers[0]._id].sort().join("-"),
    members: [self._id, peers[0]._id],
    createdAt: new Date().toISOString(),
    unreadBy: { [self._id]: 0, [peers[0]._id]: 0 },
  }
    setActiveConversation(conv);
  }, [self, peers, setActiveConversation]);

  // Socket mock listeners
  useEffect(() => {
    socket.on("presenceUpdate", (ids: string[]) => setOnlineUsers(ids));
    socket.on("receiveMessage", (msg: IMessageDTO) => addMessage(msg));
    return () => {
      socket.off("presenceUpdate");
      socket.off("receiveMessage");
    };
  }, [addMessage, setOnlineUsers]);

  const peer = useMemo(() => {
    if (!activeConversation || !self) return null;
    const pid = activeConversation.members.find(m => m !== self._id);
    return peers.find(p => p._id === pid) || null;
  }, [activeConversation, self, peers]);

  const online = peer ? onlineUserIds.has(peer._id) : false;

  const handleSendMessage = useCallback(async (text: string) => {
    if (!self || !activeConversation) return;
    const tmp: IMessageDTO = {
      _id: `tmp-${Date.now()}`,
      conversationId: activeConversation._id,
      senderId: self._id,
      receiverId: peer?._id || "",
      senderName: self.name,
      senderAvatar: "",
      content: text,
      createdAt: new Date().toISOString(),
      status: "sent",
    };
    addMessage(tmp);
    socket.emit("sendMessage", tmp);
  }, [self, activeConversation, addMessage, peer]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-secondary-900 rounded-2xl overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <ChatHeader peer={peer} online={online} onMenuClick={() => setIsSidebarOpen(true)} />
        <MessageList messages={messages} selfId={self?._id || ""} />
        <MessageInput selfId={self?._id || ""} conversationId={activeConversation?._id || ""} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
