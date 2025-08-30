import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  questionType: { type: String, enum: ["text", "number", "select", "checkbox", "radio", "button"], required: true },
  category: { type: String, enum: ["bathroom", "kitchen", "living_room", "bedroom", "other"], required: true },
  targetUser: { type: String, enum: ["homeowner", "contractor", "architect", "other"], required: true },
  options: [{ type: String }],
  selectionMode: { type: String, enum: ["single", "multiple"], default: "single" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Question || mongoose.model("Question", questionSchema);