"use client";

import { create } from "zustand";
import type {
  IUserDTO,
  IMessageDTO,
  IConversationDTO,
  MessageStatus,
} from "@/lib/types";

interface ChatState {
  self: IUserDTO | null;
  peers: IUserDTO[];
  activeConversation: IConversationDTO | null;
  messages: Record<string, IMessageDTO[]>;
  onlineUserIds: Set<string>;
  typingBy: Record<string, string[]>;
  setSelf: (user: IUserDTO) => void;
  setPeers: (users: IUserDTO[]) => void;
  setActiveConversation: (
    conv:
      | IConversationDTO
      | null
      | ((prev: IConversationDTO | null) => IConversationDTO | null)
  ) => void;
  addMessage: (msg: IMessageDTO) => void;
  markAsRead: (conversationId: string) => void;
  setOnlineUsers: (ids: string[]) => void;
  setTyping: (
    conversationId: string,
    userId: string,
    isTyping: boolean
  ) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  self: null,
  peers: [],
  activeConversation: null,
  messages: {},
  onlineUserIds: new Set(),
  typingBy: {},

  setSelf: (user) => set({ self: user }),
  setPeers: (users) => set({ peers: users }),
  setActiveConversation: (conv) => {
    set((state) => ({
      activeConversation:
        typeof conv === "function" ? conv(state.activeConversation) : conv,
    }));
  },

  addMessage: (msg) => {
    if (!msg.conversationId) return;

    set((state) => {
      const prevMessages = state.messages[msg.conversationId] || [];
      let updatedMessages: IMessageDTO[] = [...prevMessages];

      if (msg._id) {
        // پیام واقعی از سرور
        const index = updatedMessages.findIndex(
          (m) => m.tempId && m.tempId === msg.tempId
        );

        if (index !== -1) {
          // جایگزین کردن پیام موقت با پیام واقعی
          updatedMessages[index] = { ...msg, status: "sent" };
        } else if (!updatedMessages.some((m) => m._id === msg._id)) {
          updatedMessages.push({ ...msg, status: "sent" });
        }
      } else if (msg.tempId) {
        // پیام موقت
        if (!updatedMessages.some((m) => m.tempId === msg.tempId)) {
          updatedMessages.push({ ...msg, status: msg.status || "sending" });
        }
      } else {
        console.error("Invalid message: missing _id and tempId", msg);
        return state;
      }

      return {
        messages: { ...state.messages, [msg.conversationId]: updatedMessages },
      };
    });
  },

  markAsRead: (conversationId) => {
    const { activeConversation, self } = get();
    if (
      !activeConversation ||
      !self ||
      activeConversation._id !== conversationId
    )
      return;
    if (activeConversation.unreadBy[self._id] === 0) return;

    set((state) => ({
      activeConversation: {
        ...state.activeConversation!,
        unreadBy: { ...state.activeConversation!.unreadBy, [self._id]: 0 },
      },
      messages: {
        ...state.messages,
        [conversationId]:
          state.messages[conversationId]?.map((msg) =>
            msg.senderId !== self._id && msg.status !== "seen"
              ? { ...msg, status: "seen" as MessageStatus }
              : msg
          ) || [],
      },
    }));

    fetch(`/api/chat/seen/${conversationId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userId: self._id }),
    }).catch((err) => console.error("Seen API error:", err));
  },

  setOnlineUsers: (ids) => set({ onlineUserIds: new Set(ids) }),

  setTyping: (conversationId, userId, isTyping) => {
    set((state) => {
      const typingUsers = state.typingBy[conversationId] || [];
      const updatedTyping = isTyping
        ? [...new Set([...typingUsers, userId])]
        : typingUsers.filter((id) => id !== userId);
      return {
        typingBy: { ...state.typingBy, [conversationId]: updatedTyping },
      };
    });
  },
}));
