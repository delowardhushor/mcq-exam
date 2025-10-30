import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";

import questionRoutes from "./routes/question.routes";
import authRoutes from "./routes/auth.routes";

config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Mock Exam API (TypeScript)"));

app.use("/api/questions", questionRoutes);
app.use("/api/auth", authRoutes);


export default app;
