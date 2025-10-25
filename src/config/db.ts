import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mockexam");
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Mongo connection error", err);
    process.exit(1);
  }
};
