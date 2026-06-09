import express from "express";
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  approveBooking,
  rejectBooking,
  cancelBooking,
  returnBooking,
} from "../controllers/bookingController.js";

import {
  authMiddleware,
} from "../middlewares/authMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post(
  "/",
  authMiddleware,
  createBooking
);

bookingRouter.get(
  "/my",
  authMiddleware,
  getMyBookings
);

bookingRouter.get(
  "/",
  authMiddleware,
  getAllBookings
);

bookingRouter.put(
  "/approve/:id",
  authMiddleware,
  approveBooking
);

bookingRouter.put(
  "/reject/:id",
  authMiddleware,
  rejectBooking
);

bookingRouter.put(
  "/cancel/:id",
  authMiddleware,
  cancelBooking
);

bookingRouter.put(
  "/return/:id",
  authMiddleware,
  returnBooking
);

export default bookingRouter;