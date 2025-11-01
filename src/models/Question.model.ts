// src/models/Question.model.ts
import { Schema, model, Document } from "mongoose";

export interface IQuestion extends Document {
  questionText: string;
  options: string[];
  correctAnswer: string;
  categories: string[]; // category slugs
  subjects: string[];   // subject slugs
  difficulty: "easy" | "medium" | "hard";
  explanation?: string;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    categories: [{ type: String, lowercase: true, trim: true }], // e.g., "bcs", "hsc", "math"
    subjects: [{ type: String, lowercase: true, trim: true }],   // e.g., "english", "geometry"
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
