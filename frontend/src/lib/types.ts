// export type Role = "user" | "admin" | "advisor";

// export interface IUserDTO {
//   _id: string;
//   name: string;
//   role: Role;
//   phone?: string;
//   avatarUrl?: string;
//   status?: "online" | "offline";
//   lastSeen?: string; // ISO
// }

// export interface IConversationDTO {
//   _id: string; // canonical id (e.g. sorted members "user-admin")
//   members: string[]; // user ids
//   createdAt: string; // ISO
//   lastMessageAt?: string; // ISO
//   unreadBy: Record<string, number>; // userId -> unread count
// }

// export type MessageStatus =
//   | "sending"
//   | "sent"
//   | "delivered"
//   | "seen"
//   | "failed";

// export interface IAttachmentDTO {
//   url: string;
//   name: string;
//   size: number; // bytes
//   mime?: string;
// }

// export interface IMessageDTO {
//   _id: string; // server id; for optimistic use `tmp-<ts>` pattern
//   conversationId: string;
//   senderId: string;
//   receiverId: string;
//   senderName?: string;
//   senderAvatar?: string;
//   content: string;
//   attachments?: IAttachmentDTO[];
//   createdAt: string; // ISO
//   status: MessageStatus;
//   tempId?: string;
// }


// lib/types.ts
// export type Role = "user" | "admin" | "advisor";

// export interface IUserDTO {
//   _id: string;
//   name: string;
//   role: Role;
//   phone?: string;
//   avatarUrl?: string;
//   status?: "online" | "offline";
//   lastSeen?: string; // ISO
// }

// export interface IConversationDTO {
//   _id: string; // canonical id (e.g. sorted members "user-admin")
//   members: string[]; // user ids
//   createdAt: string; // ISO
//   lastMessageAt?: string; // ISO
//   unreadBy: Record<string, number>; // userId -> unread count
// }

// export type MessageStatus = "sending" | "sent" | "delivered" | "seen" | "failed";

// export interface IAttachmentDTO {
//   url: string;
//   name: string;
//   size: number; // bytes
//   mime?: string;
// }

// export interface IMessageDTO {
//   _id: string; // server id; for optimistic use `tmp-<ts>` pattern
//   conversationId: string;
//   senderId: string;
//   receiverId: string;
//   senderName?: string;
//   senderAvatar?: string;
//   content: string;
//   attachments?: IAttachmentDTO[];
//   createdAt: string; // ISO
//   status: MessageStatus;
//   tempId?: string;
// }

// lib/types.ts
export interface IUserDTO {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  avatarUrl?: string;
  status: string;
  lastSeen: string;
}

export type MessageStatus = "sending" | "sent" | "seen" | "failed";

export interface IMessageDTO {
  _id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  attachments?: IAttachmentDTO[];
  createdAt: string;
  status: MessageStatus;
  tempId?: string;
}

export interface IAttachmentDTO {
  url: string;
  type: string;
  name?: string;
  size?: number;
}

export interface IConversationDTO {
  _id: string;
  members: string[];
  createdAt: string;
  unreadBy: Record<string, number>;
}