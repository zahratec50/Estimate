"use client";
import { create } from "zustand";

export interface IUser {
  _id: string;
  name: string;
  avatar?: string;
  unreadCount?: number;
}

export interface IMessage {
  _id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  senderName?: string;
  senderAvatar?: string;
  content: string;
  status: "sent" | "delivered" | "seen";
  createdAt: string;
}

interface AdminChatState {
  users: IUser[];
  selectedUser: IUser | null;
  messages: IMessage[];
  setUsers: (users: IUser[]) => void;
  setSelectedUser: (user: IUser | null) => void;
  setMessages: (messages: IMessage[]) => void;
  addMessage: (msg: IMessage) => void;
  incrementUnread: (userId: string) => void;
  markAsRead: (userId: string) => void;
}

export const useAdminChatStore = create<AdminChatState>((set) => ({
  users: [],
  selectedUser: null,
  messages: [],
  setUsers: (users) => set({ users }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setMessages: (messages) => set({ messages }),
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),
  incrementUnread: (userId) =>
    set((state) => ({
      users: state.users.map((u) =>
        u._id === userId ? { ...u, unreadCount: (u.unreadCount || 0) + 1 } : u
      ),
    })),
  markAsRead: (userId) =>
    set((state) => ({
      users: state.users.map((u) =>
        u._id === userId ? { ...u, unreadCount: 0 } : u
      ),
    })),
}));
