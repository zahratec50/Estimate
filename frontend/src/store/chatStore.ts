"use client";
import { create } from "zustand";
import type { IMessageDTO, IConversationDTO, IUserDTO } from "@/lib/types";

interface ChatState {
  self: IUserDTO | null;
  peers: IUserDTO[];
  activeConversation: IConversationDTO | null;
  messages: IMessageDTO[];
  typingBy: Set<string>;
  onlineUserIds: Set<string>;
  setSelf: (u: IUserDTO) => void;
  setPeers: (p: IUserDTO[]) => void;
  setActiveConversation: (c: IConversationDTO | null) => void;
  setMessages: (m: IMessageDTO[]) => void;
  addMessage: (m: IMessageDTO) => void;
  setTyping: (userId: string, isTyping: boolean) => void;
  setOnlineUsers: (ids: string[]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  self: null,
  peers: [],
  activeConversation: null,
  messages: [],
  typingBy: new Set(),
  onlineUserIds: new Set(),
  setSelf: (u) => set({ self: u }),
  setPeers: (p) => set({ peers: p }),
  setActiveConversation: (c) => set({ activeConversation: c, messages: [] }),
  setMessages: (m) => set({ messages: m }),
  addMessage: (m) => set((s) => ({ messages: [...s.messages, m] })),
  setTyping: (userId, isTyping) =>
    set((s) => {
      const next = new Set(s.typingBy);
      if (isTyping) next.add(userId);
      else next.delete(userId);
      return { typingBy: next };
    }),
  setOnlineUsers: (ids) => set({ onlineUserIds: new Set(ids) }),
}));
