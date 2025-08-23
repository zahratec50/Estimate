import { Schema, model, models } from "mongoose";

const AttachmentSchema = new Schema(
  {
    name: String,
    url: String,
    size: Number,
  },
  { _id: false }
);

const MessageSchema = new Schema(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { ttype: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    attachments: { type: [AttachmentSchema], default: [] },
    status: {
      type: String,
      enum: ["sent", "delivered", "seen"],
      default: "sent",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default models.Message || model("Message", MessageSchema);
