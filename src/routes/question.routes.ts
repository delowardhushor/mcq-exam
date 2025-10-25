// src/routes/question.routes.ts
import { Router } from "express";
import { createQuestion, getQuestions } from "../controllers/Question.controller";

const router = Router();

router.post("/", createQuestion);
router.get("/", getQuestions);

export default router;
