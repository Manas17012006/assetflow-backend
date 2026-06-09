import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./router/authRouter.js";
import categoryRouter from "./router/categoryRouter.js";
import assetRouter from "./router/assetRouter.js";
import bookingRouter from "./router/bookingRouter.js";
import maintenanceRouter from "./router/maintenanceRouter.js";
import adminRouter from "./router/adminRouter.js";
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("AssetFlow backend is running");
});

app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/assets", assetRouter);
app.use("/api/bookings", bookingRouter);
app.use(
  "/api/maintenance",
  maintenanceRouter
);
app.use(
  "/api/admin",
  adminRouter
);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});