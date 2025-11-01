// src/controllers/Question.controller.ts
import { Request, Response } from "express";
import Question from "../models/Question.model";
import Category from "../models/Category.model";
import Subject from "../models/Subject.model";

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json({ success: true, data: question });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating question", error });
  }
};

export const bulkCreateQuestions = async (req: Request, res: Response)  => {
  try {
    const { questions } = req.body;
    if (!Array.isArray(questions)) {
      return res.status(400).json({ status:false, message: "Questions must be an array." });
    }

    for (let q of questions) {
      const categorySlugs: string[] = [];
      const subjectSlugs: string[] = [];

      // Handle Categories
      for (let c of q.categories || []) {
        let slug = (c as string).toLowerCase().trim().replace(/\s+/g, "-");
        let category = await Category.findOne({ slug });
        if (!category) {
          category = await Category.create({ name: c, slug });
        }
        categorySlugs.push(category.slug);
      }

      // Handle Subjects
      for (let s of q.subjects || []) {
        let slug = (s as string).toLowerCase().trim().replace(/\s+/g, "-");
        let subject = await Subject.findOne({ slug });
        if (!subject) {
          subject = await Subject.create({ name: s, slug });
        }
        subjectSlugs.push(subject.slug);
      }

      // Save question with slugs
      await Question.create({
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        categories: categorySlugs,
        subjects: subjectSlugs,
        difficulty: q.difficulty || "medium",
        explanation: q.explanation || "",
      });
    }

    res.json({status:true, message: "Questions added successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({status:false, message: "Error adding questions." });
  }
}

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const filters = req.query;
    const questions = await Question.find(filters);
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching questions", error });
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Question.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Question not found" });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating question", error });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Question.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Question not found" });
    res.status(200).json({ success: true, message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting question", error });
  }
};
