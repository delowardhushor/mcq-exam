// routes/subject.ts
import express from "express";
import Subject from "../models/Subject.model";

const router = express.Router();

// Create subject
router.post("/", async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    res.json(subject);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Get all subjects
router.get("/", async (req, res) => {
  const subjects = await Subject.find();
  res.json(subjects);
});

// Update subject
router.put("/:id", async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(subject);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Delete subject
router.delete("/:id", async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: "Subject deleted" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
