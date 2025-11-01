// models/Category.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  slug: string;
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    slug: { type: String, unique: true}
  },
  { timestamps: true }
);

// ✅ Pre-save hook using 'any' to avoid TS errors
CategorySchema.pre("save", function (next) {
  const doc: any = this; // <-- cast to any here
  if (!doc.slug && doc.name) {
    doc.slug = doc.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
  }
  next();
});


export default mongoose.model<ICategory>("Category", CategorySchema);
