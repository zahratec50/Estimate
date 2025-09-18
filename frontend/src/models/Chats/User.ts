import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    avatar: { type: String },
    role: { type: String, enum: ["user", "admin", "consultant"], default: "user" },
    online: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
