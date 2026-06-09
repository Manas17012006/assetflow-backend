import userModel from "../models/userModel.js";

export const getAllUsers = async (
  req,
  res
) => {
  try {
    const users =
      await userModel
        .find()
        .select("-password -otp");

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const recruitAdmin = async (
  req,
  res
) => {
  try {
    const { userId } =
      req.body;

    const user =
      await userModel.findById(
        userId
      );

    if (!user) {
      return res.json({
        success: false,
        message:
          "User not found",
      });
    }

    if (
      user.role ===
      "admin"
    ) {
      return res.json({
        success: false,
        message:
          "User is already an admin",
      });
    }

    user.role = "admin";

    await user.save();

    res.json({
      success: true,
      message:
        "User recruited as admin successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message:
        error.message,
    });
  }
};