import express from "express";

import {
  createMaintenanceReport,
  getMyReports,
  getAllReports,
  resolveReport,
} from "../controllers/maintenanceController.js";

import {
  authMiddleware,
} from "../middlewares/authMiddleware.js";

const maintenanceRouter =
  express.Router();

maintenanceRouter.post(
  "/",
  authMiddleware,
  createMaintenanceReport
);

maintenanceRouter.get(
  "/my",
  authMiddleware,
  getMyReports
);

maintenanceRouter.get(
  "/",
  authMiddleware,
  getAllReports
);

maintenanceRouter.put(
  "/resolve/:id",
  authMiddleware,
  resolveReport
);

export default maintenanceRouter;