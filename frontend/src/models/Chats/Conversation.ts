import { Schema, model, models, Types } from "mongoose";

const ConversationSchema = new Schema(
  {
    members: [{ type: Types.ObjectId, ref: "User", required: true }],
    lastMessage: { type: Types.ObjectId, ref: "Message" },
    unreadCounts: {
      type: Map,
      of: Number,
      default: {},
    }, // هر کاربر → تعداد پیام‌های ناخوانده
  },
  { timestamps: true }
);

export const Conversation = models.Conversation || model("Conversation", ConversationSchema);
