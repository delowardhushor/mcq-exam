// src/models/Question.model.ts
import { Schema, model, Document } from "mongoose";

export interface IQuestion extends Document {
  questionText: string;
  options: string[];
  correctAnswer: string;
  categories: string[]; // e.g. ['bcs', 'general-knowledge']
  subjects: string[];   // e.g. ['math', 'english']
  difficulty: "easy" | "medium" | "hard";
  explanation?: string;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    questionText: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
    categories: [{ type: String }],
    subjects: [{ type: String }],
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    explanation: String,
  },
  { timestamps: true }
);

export default model<IQuestion>("Question", QuestionSchema);
