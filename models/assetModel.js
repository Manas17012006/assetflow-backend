import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    totalQuantity: {
      type: Number,
      required: true,
      min: 0,
    },

    availableQuantity: {
      type: Number,
      required: true,
      min: 0,
    },

    condition: {
      type: String,
      enum: ["Good", "Fair", "Damaged"],
      default: "Good",
    },

    location: {
      type: String,
      trim: true,
      default: "Student's Activity Club",
    },
  },
  { timestamps: true }
);

const assetModel = mongoose.model("Asset", assetSchema);

export default assetModel;