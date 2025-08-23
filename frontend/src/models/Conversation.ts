import { Schema, model, models } from "mongoose";

const ConversationSchema = new Schema(
  {
    _id: { type: String }, // conversationId به صورت string
    members: { type: [String], required: true }, // مثلا ["admin-1", "user-1"]
    lastMessageAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Conversation = models.Conversation || model("Conversation", ConversationSchema);
export default Conversation;
