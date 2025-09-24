"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useChatStore } from "@/store/chatStore";
import { useAppStore } from "@/store/useAppStore";
import type { IUserDTO, IMessageDTO, IConversationDTO, IAttachmentDTO } from "@/lib/types";
import axios from "axios";

const api = axios.create({ baseURL: "/api", withCredentials: true });

export default function ChatLayout() {
  const {
    self,
    setSelf,
    peers,
    setPeers,
    activeConversation,
    setActiveConversation,
    messages,
    addMessage,
    onlineUserIds,
    markAsRead,
  } = useChatStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialScrollDone, setInitialScrollDone] = useState(false);

  const setUnreadCount = useAppStore((s) => s.setUnreadCount);

  // Fetch self & peers
  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);

        const resSelf = await api.get("/auth/me");
        const user: IUserDTO = resSelf.data.user;
        if (!user || !user._id) throw new Error("User data is invalid");
        if (mounted) setSelf(user);

        const resUsers = await api.get("/admin/users");
        const allUsers: IUserDTO[] = resUsers.data;
        const peersList = allUsers.filter(
          (u) => u._id !== user._id && (u.role === "admin" || u.role === "consultant")
        );
        if (mounted) setPeers(peersList);

        const firstPeer = peersList.find((p) => p.role === "admin") || peersList[0];
        if (firstPeer && mounted) {
          const conv: IConversationDTO = {
            _id: [user._id, firstPeer._id].sort().join("-"),
            members: [user._id, firstPeer._id],
            createdAt: new Date().toISOString(),
            unreadBy: { [user._id]: 0, [firstPeer._id]: 0 },
          };
          setActiveConversation(conv);
          markAsRead(conv._id);
        }
      } catch (err: any) {
        console.error("Fetch data error:", err.message);
        if (mounted) setError(`Failed to load chat data: ${err.message}`);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, [setSelf, setPeers, setActiveConversation, markAsRead]);

  // Polling messages
  useEffect(() => {
    if (!activeConversation?._id || !self?._id) return;

    const ac = new AbortController();

    const fetchMessages = async () => {
      try {
        const res = await api.get(`/chat/messages/${activeConversation._id}`, { signal: ac.signal });
        const newMessages: IMessageDTO[] = res.data;
        newMessages.forEach((msg) => addMessage(msg));
      } catch (err: any) {
        if (err.name !== "AbortError") console.error("Fetch messages error:", err.message);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);

    return () => {
      ac.abort();
      clearInterval(interval);
    };
  }, [activeConversation?._id, self?._id, addMessage]);

  // Reset unread count
  useEffect(() => {
    if (activeConversation && self && activeConversation.unreadBy[self._id] !== 0) {
      setUnreadCount(0);
      markAsRead(activeConversation._id);
    }
  }, [activeConversation, self, setUnreadCount, markAsRead]);

  const peer = useMemo(() => {
    if (!activeConversation || !self) return null;
    const pid = activeConversation.members.find((m) => m !== self._id);
    return peers.find((p) => p._id === pid) || null;
  }, [activeConversation, self, peers]);

  const online = peer ? onlineUserIds.has(peer._id) : false;

  // Send message
  const handleSendMessage = useCallback(async (text: string, attachments: IAttachmentDTO[] = []) => {
    if (!self || !activeConversation || !peer) return;

    const tmp: IMessageDTO = {
      _id: "",
      tempId: `tmp-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      conversationId: activeConversation._id,
      senderId: self._id,
      receiverId: peer._id,
      senderName: self.name,
      senderAvatar: self.avatarUrl || "",
      content: text || "File attachment",
      attachments: attachments.length ? attachments : undefined,
      createdAt: new Date().toISOString(),
      status: "sending",
    };

    addMessage(tmp);

    try {
      const res = await api.post("/chat/send", {
        conversationId: tmp.conversationId,
        content: tmp.content,
        attachments: tmp.attachments,
      });

      const sentMsg: IMessageDTO = res.data;
      addMessage({ ...sentMsg, tempId: tmp.tempId });
    } catch (err: any) {
      addMessage({ ...tmp, status: "failed" });
    }
  }, [self, activeConversation, peer, addMessage]);

  if (loading) return <div className="p-4 text-center">Loading chat...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (!self || !self._id) return <div className="p-4 text-center">User not authenticated</div>;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-neutral-900 rounded-2xl overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <ChatHeader peer={peer} online={online} onMenuClick={() => setIsSidebarOpen(true)} />
        <MessageList
          messages={activeConversation ? messages[activeConversation._id] || [] : []}
          selfId={self._id}
          initialScrollDone={initialScrollDone}
          setInitialScrollDone={setInitialScrollDone}
        />
        {activeConversation && (
          <MessageInput
            selfId={self._id}
            conversationId={activeConversation._id}
            onSendMessage={handleSendMessage}
          />
        )}
      </div>
    </div>
  );
}


