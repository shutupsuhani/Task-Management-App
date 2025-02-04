import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  userId: string;
  status: "pending" | "in-progress" | "completed";
  dueDate: Date;
  createdAt: Date;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  userId: { type: String, required: true },
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
  dueDate: { type: Date, required: true }, // Add dueDate field
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);
