// src/routes/auth.routes.ts
import { Router } from "express";
import { googleLogin } from "../controllers/Auth.controller";

const router = Router();

router.post("/google", googleLogin);

export default router;
