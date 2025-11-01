// src/routes/question.routes.ts
import { Router } from "express";
import {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
  bulkCreateQuestions,
} from "../controllers/Question.controller";
import { authMiddleware, adminOnly } from "../middlewares/authMiddleware";

const router = Router();

// Public (for exam generation)
router.get("/", getQuestions);

// Admin-only
router.post("/", createQuestion);
router.post("/bulk", bulkCreateQuestions);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

export default router;
