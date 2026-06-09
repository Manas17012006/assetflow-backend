import maintenanceModel from "../models/maintenanceModel.js";
import assetModel from "../models/assetModel.js";

import {
  sendMaintenanceEmail,
  sendMaintenanceResolvedEmail,
} from "../config/mailer.js";

export const createMaintenanceReport = async (
  req,
  res
) => {
  try {
    const {
      assetId,
      issue,
      severity,
    } = req.body;

    if (!assetId || !issue) {
      return res.json({
        success: false,
        message:
          "Asset and issue are required",
      });
    }

    const asset = await assetModel
      .findById(assetId)
      .populate(
        "addedBy",
        "name email"
      );

    if (!asset) {
      return res.json({
        success: false,
        message: "Asset not found",
      });
    }

    const report =
      await maintenanceModel.create({
        assetId,
        reportedBy: req.user._id,
        issue,
        severity,
      });

    try {
      await sendMaintenanceEmail(
        asset.addedBy?.email,
        asset.name,
        req.user.name,
        issue,
        severity
      );
    } catch (mailError) {
      console.log(
        "Maintenance email failed:",
        mailError.message
      );
    }

    res.json({
      success: true,
      message:
        "Maintenance report submitted",
      report,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyReports = async (
  req,
  res
) => {
  try {
    const reports =
      await maintenanceModel
        .find({
          reportedBy: req.user._id,
        })
        .populate(
          "assetId",
          "name code"
        )
        .sort({
          createdAt: -1,
        });

    res.json({
      success: true,
      reports,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllReports = async (
  req,
  res
) => {
  try {
    const reports =
      await maintenanceModel
        .find()
        .populate(
          "assetId",
          "name code"
        )
        .populate(
          "reportedBy",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

    res.json({
      success: true,
      reports,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const resolveReport = async (
  req,
  res
) => {
  try {
    const report =
      await maintenanceModel
        .findById(req.params.id)
        .populate(
          "assetId",
          "name"
        )
        .populate(
          "reportedBy",
          "name email"
        );

    if (!report) {
      return res.json({
        success: false,
        message:
          "Report not found",
      });
    }

    if (
      report.status ===
      "Resolved"
    ) {
      return res.json({
        success: false,
        message:
          "Report already resolved",
      });
    }

    report.status =
      "Resolved";

    await report.save();

    try {
      await sendMaintenanceResolvedEmail(
        report.reportedBy.email,
        report.assetId.name
      );
    } catch (mailError) {
      console.log(
        "Resolution email failed:",
        mailError.message
      );
    }

    res.json({
      success: true,
      message:
        "Report resolved",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};