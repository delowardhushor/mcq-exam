import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 5555;

connectDB();
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
