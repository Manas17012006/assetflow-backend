import categoryModel from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.json({
        success: false,
        message: "Category name is required",
      });
    }

    const existing = await categoryModel.findOne({
      name: name.trim(),
    });

    if (existing) {
      return res.json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await categoryModel.create({
      name,
      description,
    });

    res.json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel
      .find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Category updated",
      category,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await categoryModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};