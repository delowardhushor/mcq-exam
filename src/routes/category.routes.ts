// routes/category.ts
import express from "express";
import Category from "../models/Category.model";

const router = express.Router();

// Create category
router.post("/", async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = await Category.create({ name, description });
    res.json(category);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Get all categories
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// Update category
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(category);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Delete category
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
