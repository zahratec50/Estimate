"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { IMessageDTO, IConversationDTO, IUserDTO } from "@/lib/types";

// Mock Socket فقط برای شبیه سازی
class MockSocket {
  listeners: Record<string, Function[]> = {};
  on(event: string, cb: Function) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(cb);
    console.log(`[MockSocket] Listening ${event}`);
  }
  off(event: string, cb?: Function) {
    if (!this.listeners[event]) return;
    if (cb)
      this.listeners[event] = this.listeners[event].filter((f) => f !== cb);
    else delete this.listeners[event];
  }
  emit(event: string, data?: any) {
    console.log(`[MockSocket] Emit ${event}`, data);
    (this.listeners[event] || []).forEach((f) => f(data));
  }
}

export const socket = new MockSocket();

interface ChatState {
  self: IUserDTO | null;
  peers: IUserDTO[];
  activeConversation: IConversationDTO | null;
  messages: IMessageDTO[];
  typingBy: Set<string>;
  onlineUserIds: Set<string>;

  setSelf: (u: IUserDTO) => void;
  setPeers: (p: IUserDTO[]) => void;
  setActiveConversation: (c: IConversationDTO) => void;
  setMessages: (msgs: IMessageDTO[]) => void;
  addMessage: (msg: IMessageDTO) => void;
  replaceMessage: (tempId: string, serverMsg: IMessageDTO) => void;
  setTyping: (userId: string, isTyping: boolean) => void;
  setOnlineUsers: (ids: string[]) => void;
}

export const useChatStore = create<ChatState>()(
  devtools((set) => ({
    self: null,
    peers: [],
    activeConversation: null,
    messages: [],
    typingBy: new Set(),
    onlineUserIds: new Set(),

    setSelf: (u) => set({ self: u }),
    setPeers: (p) => set({ peers: p }),
    setActiveConversation: (c) => set({ activeConversation: c, messages: [] }),
    setMessages: (msgs) => set({ messages: msgs }),

    addMessage: (msg: IMessageDTO) =>
      set((s) => {
        // بررسی وجود پیام بر اساس _id یا clientTempId
        const existsIdx = s.messages.findIndex(
          (m) => m._id === msg._id || (msg as any).clientTempId && (m as any).clientTempId === (msg as any).clientTempId
        );
        if (existsIdx !== -1) {
          const next = [...s.messages];
          next[existsIdx] = { ...next[existsIdx], ...msg };
          return { messages: next };
        }
        return { messages: [...s.messages, msg] };
      }),

    // جایگزینی پیام موقت با پیام سرور
    replaceMessage: (tempId, serverMsg) =>
      set((s) => {
        const existsIdx = s.messages.findIndex((m) => m._id === tempId || (m as any).clientTempId === tempId);
        if (existsIdx !== -1) {
          const next = [...s.messages];
          next[existsIdx] = serverMsg;
          return { messages: next };
        }
        // اگر پیام موقت پیدا نشد ولی پیام سرور جدید است
        if (!s.messages.some((m) => m._id === serverMsg._id)) {
          return { messages: [...s.messages, serverMsg] };
        }
        return { messages: s.messages };
      }),

    setTyping: (userId, isTyping) =>
      set((s) => {
        const next = new Set(s.typingBy);
        isTyping ? next.add(userId) : next.delete(userId);
        return { typingBy: next };
      }),

    setOnlineUsers: (ids) => set({ onlineUserIds: new Set(ids) }),
  }))
);
