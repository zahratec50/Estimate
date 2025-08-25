export type Role = "User" | "Admin" | "Consultant";

export interface IUserDTO {
  _id: string;
  name: string;
  role: Role;
  phone?: string;
  avatarUrl?: string;
  status?: "online" | "offline";
  lastSeen?: string; // ISO
}

export interface IConversationDTO {
  _id: string; // canonical id (e.g. sorted members "user-admin")
  members: string[]; // user ids
  createdAt: string; // ISO
  lastMessageAt?: string; // ISO
  unreadBy: Record<string, number>; // userId -> unread count
}

export type MessageStatus =
  | "sending"
  | "sent"
  | "delivered"
  | "seen"
  | "failed";

export interface IAttachmentDTO {
  url: string;
  name: string;
  size: number; // bytes
  mime?: string;
}

export interface IMessageDTO {
  _id: string; // server id; for optimistic use `tmp-<ts>` pattern
  conversationId: string;
  senderId: string;
  receiverId: string;
  senderName?: string;
  senderAvatar?: string;
  content: string;
  attachments?: IAttachmentDTO[];
  createdAt: string; // ISO
  status: MessageStatus;
}
