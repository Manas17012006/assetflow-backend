import express from "express";

import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);

categoryRouter.get("/", getCategories);

categoryRouter.put("/:id", updateCategory);

categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;