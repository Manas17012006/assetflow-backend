import bookingModel from "../models/bookingModel.js";
import assetModel from "../models/assetModel.js";
import userModel from "../models/userModel.js";

import {
  sendBookingApprovedEmail,
  sendBookingRejectedEmail,
  sendAssetReturnedEmail,
} from "../config/mailer.js";

export const createBooking = async (req, res) => {
  try {
    const {
      assetId,
      quantity,
      eventName,
      purpose,
      startDate,
      endDate,
    } = req.body;

    if (
      !assetId ||
      !quantity ||
      !eventName ||
      !purpose ||
      !startDate ||
      !endDate
    ) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    const asset = await assetModel.findById(assetId);

    if (!asset) {
      return res.json({
        success: false,
        message: "Asset not found",
      });
    }

    if (quantity > asset.availableQuantity) {
      return res.json({
        success: false,
        message: "Not enough quantity available",
      });
    }

    const booking = await bookingModel.create({
      userId: req.user._id,
      assetId,
      quantity,
      eventName,
      purpose,
      startDate,
      endDate,
    });

    res.json({
      success: true,
      message: "Booking request submitted",
      booking,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find({ userId: req.user._id })
      .populate("assetId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find()
      .populate("userId", "name email")
      .populate("assetId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const approveBooking = async (req, res) => {
  try {
    const booking = await bookingModel.findById(
      req.params.id
    );

    if (!booking) {
      return res.json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status !== "Pending") {
      return res.json({
        success: false,
        message: "Booking already processed",
      });
    }

    const asset = await assetModel
      .findById(booking.assetId)
      .populate("addedBy", "email");

    const user = await userModel.findById(
      booking.userId
    );

    if (!asset) {
      return res.json({
        success: false,
        message: "Asset not found",
      });
    }

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (
      booking.quantity >
      asset.availableQuantity
    ) {
      return res.json({
        success: false,
        message: "Not enough quantity available",
      });
    }

    asset.availableQuantity -=
      booking.quantity;

    await asset.save();

    booking.status = "Approved";

    await booking.save();

    try {
      await sendBookingApprovedEmail(
        user.email,
        asset.name,
        asset.location,
        booking.endDate,
        asset.addedBy?.email ||
          "Administrator"
      );
    } catch (mailError) {
      console.log(
        "Approval email failed:",
        mailError.message
      );
    }

    res.json({
      success: true,
      message: "Booking approved",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const rejectBooking = async (req, res) => {
  try {
    const { adminRemark } = req.body;

    const booking = await bookingModel.findById(
      req.params.id
    );

    if (!booking) {
      return res.json({
        success: false,
        message: "Booking not found",
      });
    }

    const user = await userModel.findById(
      booking.userId
    );

    booking.status = "Rejected";
    booking.adminRemark =
      adminRemark || "No reason provided";

    await booking.save();

    if (user) {
      try {
        await sendBookingRejectedEmail(
          user.email,
          booking.adminRemark
        );
      } catch (mailError) {
        console.log(
          "Rejection email failed:",
          mailError.message
        );
      }
    }

    res.json({
      success: true,
      message: "Booking rejected",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await bookingModel.findById(
      req.params.id
    );

    if (!booking) {
      return res.json({
        success: false,
        message: "Booking not found",
      });
    }

    if (
      booking.userId.toString() !==
      req.user._id.toString()
    ) {
      return res.json({
        success: false,
        message:
          "You can only cancel your own bookings",
      });
    }

    if (booking.status !== "Pending") {
      return res.json({
        success: false,
        message:
          "Only pending bookings can be cancelled",
      });
    }

    booking.status = "Cancelled";

    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const returnBooking = async (req, res) => {
  try {
    const booking = await bookingModel.findById(
      req.params.id
    );

    if (!booking) {
      return res.json({
        success: false,
        message: "Booking not found",
      });
    }

    if (
      booking.userId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not allowed to return this booking",
      });
    }

    if (booking.status !== "Approved") {
      return res.json({
        success: false,
        message:
          "Only approved bookings can be returned",
      });
    }

    const asset = await assetModel
      .findById(booking.assetId)
      .populate("addedBy", "email");

    if (!asset) {
      return res.json({
        success: false,
        message: "Asset not found",
      });
    }

    asset.availableQuantity +=
      booking.quantity;

    await asset.save();

    booking.status = "Returned";

    await booking.save();

    try {
      await sendAssetReturnedEmail(
        asset.addedBy?.email,
        asset.name,
        req.user.name
      );
    } catch (mailError) {
      console.log(
        "Return email failed:",
        mailError.message
      );
    }

    res.json({
      success: true,
      message:
        "Asset returned successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};