import express from "express";
import {
  signup,
  verifyOtp,
  resendOtp,
  login,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/resend-otp", resendOtp);
authRouter.post("/login", login);

export default authRouter;