// import mongoose, { Schema, Document } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   avatar?: string;
//   role: "user" | "admin" | "Consultant";
//   lastSeen: Date;
// }

// const userSchema = new Schema<IUser>({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   avatar: { type: String },
//   role: { type: String, enum: ["user", "admin", "Consultant"], default: "user" },
//   lastSeen: { type: Date, default: Date.now },
// });

// export default mongoose.models.User || mongoose.model<IUser>("User", userSchema);


import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: "user" | "admin" | "consultant";
  lastSeen: Date;
  isBanned: boolean;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  role: { type: String, enum: ["user", "admin", "consultant"], default: "user" },
  lastSeen: { type: Date, default: Date.now },
  isBanned: { type: Boolean, default: false }
});

export default mongoose.models.User || mongoose.model<IUser>("User", userSchema);
