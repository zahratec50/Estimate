import mongoose, { Schema, Document } from "mongoose";

export interface IAdminActivity extends Document {
  adminId: string;
  adminName: string;
  adminRole: string;
  action: string; // مثال: "Update User", "Delete Project"
  targetType: string; // مثال: "User", "Project"
  targetId?: string;
  timestamp: Date;
  details?: string; // توضیح اختیاری
}

const adminActivitySchema = new Schema<IAdminActivity>({
  adminId: { type: String, required: true },
  adminName: { type: String, required: true },
  adminRole: { type: String, required: true },
  action: { type: String, required: true },
  targetType: { type: String, required: true },
  targetId: { type: String },
  details: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.AdminActivity ||
  mongoose.model<IAdminActivity>("AdminActivity", adminActivitySchema);
