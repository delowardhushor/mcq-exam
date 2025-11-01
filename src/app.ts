import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";

import questionRoutes from "./routes/question.routes";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import subjectRoutes from "./routes/subject.routes";
import { authMiddleware } from "./middlewares/authMiddleware";

config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Mock Exam API (TypeScript)"));

app.use("/api/questions", authMiddleware, questionRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/categories", authMiddleware, categoryRoutes);
app.use("/api/subjects", authMiddleware, subjectRoutes);


export default app;
