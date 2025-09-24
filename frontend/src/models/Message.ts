import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  conversationId: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  attachments?: { url: string; type: string; name?: string; size?: number }[];
  createdAt: Date;
  status: "sending" | "sent" | "seen" | "failed";
}

const messageSchema = new Schema<IMessage>({
  conversationId: { type: String, required: true, index: true },
  senderId: { type: String, required: true, index: true },
  receiverId: { type: String, required: true, index: true },
  senderName: { type: String, required: true },
  senderAvatar: { type: String, default: "" },
  content: { type: String, required: true },
  attachments: [
    {
      url: { type: String, required: true },
      type: { type: String, required: true },
      name: { type: String },
      size: { type: Number },
    },
  ],
  status: {
    type: String,
    enum: ["sending", "sent", "seen", "failed"],
    default: "sent",
  },
  createdAt: { type: Date, default: Date.now },
});

messageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });

export default mongoose.models.Message ||
  mongoose.model<IMessage>("Message", messageSchema);
