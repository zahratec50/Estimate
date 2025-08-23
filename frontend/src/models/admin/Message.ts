// models/Message.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessageDoc extends Document {
  senderId: string;
  receiverId: string;
  content: string;
  status: "sent" | "delivered" | "seen";
  createdAt: Date;
}

const MessageSchema = new Schema<IMessageDoc>({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, enum: ["sent","delivered","seen"], default: "sent" },
  createdAt: { type: Date, default: Date.now },
});

export const Message: Model<IMessageDoc> = mongoose.models.Message || mongoose.model("Message", MessageSchema);
