// import { Schema, model, models, Document } from "mongoose";
// import type { Role } from "@/lib/types";

// export interface IUser extends Document {
//   name: string;
//   role: Role;
//   phone?: string;
//   status: "online" | "offline";
//   lastSeen: Date;
// }

// const RoleUserSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     role: { type: String, enum: ["User", "Admin", "Support", "Consultant"], required: true },
//     phone: { type: String },
//     status: { type: String, enum: ["online", "offline"], default: "offline" },
//     lastSeen: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// export default (models.Role as any) || model<IUser>("Role", RoleUserSchema);
