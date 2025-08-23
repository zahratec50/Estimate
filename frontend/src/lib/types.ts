export type Role = "User" | "Admin" | "Support" | "Consultant";
export type DeliveryStatus = "sent" | "delivered" | "seen";

export interface IUserDTO {
  _id: string;
  name: string;
  role: Role;
  phone?: string;
  status: "online" | "offline";
  lastSeen: string;
}

export interface IMessageAttachment {
  url: string;
  name: string;
  size: number; // بر حسب بایت
}

export interface IMessageDTO {
  id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  senderAvatar: string;
  conversationId: string;
  content: string;
  createdAt: string;
  status: DeliveryStatus;
  unread?: boolean;
  read?: boolean;
  attachments?: IMessageAttachment[];
}



export interface IConversationDTO {
  _id: string;
  members: string[]; // [userId, adminId/supportId]
  lastMessage?: IMessageDTO;
}