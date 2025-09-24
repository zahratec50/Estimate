// import { Schema, model, models } from "mongoose";

// const AttachmentSchema = new Schema(
//   {
//     name: String,
//     url: String,
//     size: Number,
//   },
//   { _id: false }
// );

// const MessageSchema = new Schema(
//   {
//     conversationId: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
//     senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     receiverId: { ttype: Schema.Types.ObjectId, ref: "User", required: true },
//     content: { type: String, required: true },
//     attachments: { type: [AttachmentSchema], default: [] },
//     status: {
//       type: String,
//       enum: ["sent", "delivered", "seen"],
//       default: "sent",
//     },
//     createdAt: { type: Date, default: Date.now },
//   },
//   { timestamps: { createdAt: true, updatedAt: true } }
// );

// export default models.Message || model("Message", MessageSchema);


// import mongoose, { Schema, Document } from "mongoose";

// export interface IMessage extends Document {
//   conversationId: string;
//   senderId: string;
//   receiverId: string;
//   senderName: string;
//   senderAvatar: string;
//   content: string;
//   createdAt: Date;
//   status: "sending" | "sent" | "seen" | "failed";
// }

// const messageSchema = new Schema<IMessage>({
//   conversationId: { type: String, required: true },
//   senderId: { type: String, required: true },
//   receiverId: { type: String, required: true },
//   senderName: { type: String, required: true },
//   senderAvatar: { type: String, default: "" },
//   content: { type: String, required: true },
//   status: { type: String, enum: ["sending", "sent", "seen", "failed"], default: "sent" },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);

// models/Message.ts
// import mongoose, { Schema, Document } from "mongoose";

// export interface IMessage extends Document {
//   conversationId: string;
//   senderId: string;
//   receiverId: string;
//   senderName: string;
//   senderAvatar: string;
//   content: string;
//   attachments?: { url: string; type: string; name?: string; size?: number }[];
//   createdAt: Date;
//   status: "sending" | "sent" | "seen" | "failed";
// }

// const messageSchema = new Schema<IMessage>({
//   conversationId: { type: String, required: true, index: true },
//   senderId: { type: String, required: true, index: true },
//   receiverId: { type: String, required: true, index: true },
//   senderName: { type: String, required: true },
//   senderAvatar: { type: String, default: "" },
//   content: { type: String, required: true },
//   attachments: [
//     {
//       url: { type: String, required: true },
//       type: { type: String, required: true },
//       name: { type: String },
//       size: { type: Number },
//     },
//   ],
//   status: { type: String, enum: ["sending", "sent", "seen", "failed"], default: "sent" },
//   createdAt: { type: Date, default: Date.now },
// });

// // اضافه کردن index مرکب برای بهینه‌سازی کوئری‌ها
// messageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });

// export default mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);



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
