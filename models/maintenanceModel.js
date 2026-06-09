import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    assetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    issue: {
      type: String,
      required: true,
      trim: true,
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },

    status: {
      type: String,
      enum: ["Open", "Resolved"],
      default: "Open",
    },
  },
  { timestamps: true }
);

const maintenanceModel = mongoose.model("Maintenance", maintenanceSchema);

export default maintenanceModel;