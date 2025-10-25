// src/controllers/Question.controller.ts
import { Request, Response } from "express";
import Question from "../models/Question.model";

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json({ success: true, data: question });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating question", error });
  }
};

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const filters = req.query;
    const questions = await Question.find(filters);
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching questions", error });
  }
};
