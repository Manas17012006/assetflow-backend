import express from "express";

import {
  getAllUsers,
  recruitAdmin,
} from "../controllers/adminController.js";

import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/authMiddleware.js";

const adminRouter =
  express.Router();

adminRouter.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

adminRouter.put(
  "/recruit",
  authMiddleware,
  adminMiddleware,
  recruitAdmin
);

export default adminRouter;