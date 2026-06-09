import express from "express";

import {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
} from "../controllers/assetController.js";

const assetRouter = express.Router();

assetRouter.post("/", createAsset);
assetRouter.get("/", getAssets);
assetRouter.get("/:id", getAssetById);
assetRouter.put("/:id", updateAsset);
assetRouter.delete("/:id", deleteAsset);

export default assetRouter;