// models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserDoc extends Document {
  name: string;
  avatar?: string;
  role: "user" | "admin";
  lastSeen: Date;
}

const UserSchema = new Schema<IUserDoc>({
  name: { type: String, required: true },
  avatar: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  lastSeen: { type: Date, default: Date.now },
});

export const User: Model<IUserDoc> = mongoose.models.User || mongoose.model("User", UserSchema);
