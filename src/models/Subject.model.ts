// models/Subject.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ISubject extends Document {
  name: string;
  slug: string; // reference to category slug (e.g., "bcs")
}

const SubjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, trim: true }, // optional
  },
  { timestamps: true }
);

// ✅ Pre-save hook using 'any' to avoid TS errors
SubjectSchema.pre("save", function (next) {
  const doc: any = this; // <-- cast to any here
  if (!doc.slug && doc.name) {
    doc.slug = doc.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
  }
  next();
});

export default mongoose.model<ISubject>("Subject", SubjectSchema);
