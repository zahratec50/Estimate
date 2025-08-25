import { Schema, model, models, Types } from "mongoose";

const MessageSchema = new Schema(
  {
    conversation: { type: Types.ObjectId, ref: "Conversation", required: true },
    sender: { type: Types.ObjectId, ref: "User", required: true },
    text: { type: String },
    fileUrl: { type: String }, // برای ارسال فایل یا عکس
    status: {
      type: String,
      enum: ["sent", "delivered", "seen"],
      default: "sent",
    },
  },
  { timestamps: true }
);

export const Message = models.Message || model("Message", MessageSchema);
