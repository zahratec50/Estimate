"use client";

import { create } from "zustand";
import type { IUserDTO, IMessageDTO, MessageStatus } from "@/lib/types";

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
  sendMessage: (content: string, conversationId: string) => Promise<void>;
  markAsRead: (conversationId: string) => void;
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
      let updated = [...prev];

      // اگر tempId موجود بود جایگزین کن
      if (msg.tempId) {
        const idx = updated.findIndex((m) => m.tempId === msg.tempId);
        if (idx !== -1) {
          updated[idx] = { ...updated[idx], ...msg, status: "sent" };
        } else if (!updated.some((m) => m._id === msg._id)) {
          updated.push(msg);
        }
      }
      // اگر _id معتبر هست و tempId نداره
      else if (msg._id) {
        const idx = updated.findIndex((m) => m._id === msg._id);
        if (idx === -1) updated.push(msg);
      }

      return { messages: { ...state.messages, [msg.conversationId]: updated } };
    });
  },

  loadMessages: async (conversationId: string) => {
    set({ loading: true });
    try {
      const res = await fetch(`/messages/${conversationId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Failed to fetch messages: ${res.status}`);
      const msgs: IMessageDTO[] = await res.json();
      set((state) => ({
        messages: { ...state.messages, [conversationId]: msgs },
      }));
    } catch (err: any) {
      console.error("Admin loadMessages error:", err.message);
    } finally {
      set({ loading: false });
    }
  },

  sendMessage: async (content: string, conversationId: string) => {
    const admin = get().adminSelf;
    if (!admin) {
      console.error("Missing adminSelf");
      return;
    }

    const tempId = `tmp-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 9)}`;
    const tmp: IMessageDTO = {
      _id: "",
      tempId,
      conversationId,
      senderId: admin._id,
      receiverId:
        conversationId.split("-").find((id) => id !== admin._id) || "unknown",
      senderName: admin.name,
      senderAvatar: admin.avatarUrl || "",
      content,
      createdAt: new Date().toISOString(),
      status: "sending" as MessageStatus,
    };

    // optimistic update
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
      // mark temp as failed
      set((state) => ({
        messages: {
          ...state.messages,
          [conversationId]: (state.messages[conversationId] || []).map((m) =>
            m.tempId === tempId
              ? { ...m, status: "failed" as MessageStatus }
              : m
          ),
        },
      }));
    }
  },

  markAsRead: (conversationId: string) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: (state.messages[conversationId] || []).map((msg) =>
          msg.status !== "seen"
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
