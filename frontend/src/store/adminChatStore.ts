"use client";

import { create } from "zustand";
import type { IUserDTO, IMessageDTO, MessageStatus } from "@/lib/types";

function getConversationId(userId1: string, userId2: string) {
  return [userId1, userId2].sort().join("-");
}

interface AdminChatState {
  users: IUserDTO[];
  adminSelf: IUserDTO | null;
  selectedUser: IUserDTO | null;
  messages: Record<string, IMessageDTO[]>;
  loading: boolean;

  setUsers: (users: IUserDTO[]) => void;
  setAdminSelf: (user: IUserDTO | null) => void;
  setSelectedUser: (user: IUserDTO | null) => void;

  addMessage: (msg: IMessageDTO) => void;
  loadMessages: (conversationId: string) => Promise<void>;
  sendMessage: (content: string, userId: string) => Promise<void>;
  markAsRead: (userId: string) => void;
}

export const useAdminChatStore = create<AdminChatState>((set, get) => ({
  users: [],
  adminSelf: null,
  selectedUser: null,
  messages: {},
  loading: false,

  setUsers: (users) => set({ users }),
  setAdminSelf: (user) => set({ adminSelf: user }),
  setSelectedUser: (user) => set({ selectedUser: user }),

  addMessage: (msg) => {
    if (!msg.conversationId) return;
    set((state) => {
      const prev = state.messages[msg.conversationId] || [];
      const idx = prev.findIndex(m => m._id === msg._id || m.tempId === msg.tempId);
      const updated = [...prev];
      if (idx >= 0) updated[idx] = { ...updated[idx], ...msg, status: "sent" };
      else updated.push(msg);
      return { messages: { ...state.messages, [msg.conversationId]: updated } };
    });
  },

  loadMessages: async (userId: string) => {
    const admin = get().adminSelf;
    if (!admin) return;
    set({ loading: true });
    const conversationId = getConversationId(admin._id, userId);

    try {
      const res = await fetch(`/api/chat/messages/${conversationId}`, { credentials: "include" });
      if (!res.ok) {
        if (res.status === 401) return; // silent
        throw new Error(`Failed to fetch messages: ${res.status}`);
      }
      const msgs: IMessageDTO[] = await res.json();
      set((state) => ({ messages: { ...state.messages, [conversationId]: msgs } }));
    } catch (err: any) {
      console.error("Admin loadMessages error:", err.message);
    } finally {
      set({ loading: false });
    }
  },

  sendMessage: async (content: string, userId: string) => {
    const admin = get().adminSelf;
    if (!admin) return;

    const conversationId = getConversationId(admin._id, userId);
    const tempId = `tmp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const tmp: IMessageDTO = {
      _id: "",
      tempId,
      conversationId,
      senderId: admin._id,
      receiverId: userId,
      senderName: admin.name,
      senderAvatar: admin.avatarUrl || "",
      content,
      createdAt: new Date().toISOString(),
      status: "sending" as MessageStatus,
    };

    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), tmp],
      },
    }));

    try {
      const res = await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...tmp }),
      });
      if (!res.ok) throw new Error(`Failed to send: ${res.status}`);
      const sent: IMessageDTO = await res.json();
      get().addMessage(sent);
    } catch (err: any) {
      console.error("Admin sendMessage error:", err.message);
      set((state) => ({
        messages: {
          ...state.messages,
          [conversationId]: (state.messages[conversationId] || []).map((m) =>
            m.tempId === tempId ? { ...m, status: "failed" as MessageStatus } : m
          ),
        },
      }));
    }
  },

  markAsRead: (userId: string) => {
    const admin = get().adminSelf;
    if (!admin) return;
    const conversationId = getConversationId(admin._id, userId);

    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: (state.messages[conversationId] || []).map((msg) =>
          msg.senderId === userId && msg.status !== "seen"
            ? { ...msg, status: "seen" as MessageStatus }
            : msg
        ),
      },
    }));

    fetch(`/api/chat/seen/${conversationId}`, {
      method: "POST",
      credentials: "include",
    }).catch((err) => console.error("Seen API error:", err));
  },
}));
