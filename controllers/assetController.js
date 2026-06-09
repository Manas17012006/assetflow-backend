import assetModel from "../models/assetModel.js";

export const createAsset = async (req, res) => {
  try {
    const {
      categoryId,
      addedBy,
      name,
      code,
      description,
      totalQuantity,
      availableQuantity,
      condition,
      location,
    } = req.body;

    if (!categoryId) return res.json({success:false,message:"categoryId missing"});

if (!addedBy) return res.json({success:false,message:"addedBy missing"});

if (!name) return res.json({success:false,message:"name missing"});

if (!code) return res.json({success:false,message:"code missing"});

if (totalQuantity === undefined)
  return res.json({success:false,message:"totalQuantity missing"});

if (availableQuantity === undefined)
  return res.json({success:false,message:"availableQuantity missing"});

    const existingAsset = await assetModel.findOne({
      code: code.toUpperCase(),
    });

    if (existingAsset) {
      return res.json({
        success: false,
        message: "Asset code already exists",
      });
    }

    const asset = await assetModel.create({
      categoryId,
      addedBy,
      name,
      code,
      description,
      totalQuantity,
      availableQuantity,
      condition,
      location,
    });

    res.json({
      success: true,
      message: "Asset created successfully",
      asset,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAssets = async (req, res) => {
  try {
    const assets = await assetModel
      .find()
      .populate("categoryId", "name")
      .populate("addedBy", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      assets,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAssetById = async (req, res) => {
  try {
    const asset = await assetModel
      .findById(req.params.id)
      .populate("categoryId", "name")
      .populate("addedBy", "name email");

    if (!asset) {
      return res.json({
        success: false,
        message: "Asset not found",
      });
    }

    res.json({
      success: true,
      asset,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAsset = async (req, res) => {
  try {
    const asset = await assetModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!asset) {
      return res.json({
        success: false,
        message: "Asset not found",
      });
    }

    res.json({
      success: true,
      message: "Asset updated successfully",
      asset,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    const asset = await assetModel.findByIdAndDelete(
      req.params.id
    );

    if (!asset) {
      return res.json({
        success: false,
        message: "Asset not found",
      });
    }

    res.json({
      success: true,
      message: "Asset deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};