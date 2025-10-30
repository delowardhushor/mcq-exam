// src/routes/question.routes.ts
import { Router } from "express";
import {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
} from "../controllers/Question.controller";
import { authMiddleware, adminOnly } from "../middlewares/authMiddleware";

const router = Router();

// Public (for exam generation)
router.get("/", getQuestions);

// Admin-only
router.post("/", authMiddleware, adminOnly, createQuestion);
router.put("/:id", authMiddleware, adminOnly, updateQuestion);
router.delete("/:id", authMiddleware, adminOnly, deleteQuestion);

export default router;
