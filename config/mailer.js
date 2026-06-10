import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP VERIFY ERROR:", error);
  } else {
    console.log("SMTP SERVER READY");
  }
});

export const sendOtpEmail = async (
  email,
  otp
) => {
  await transporter.sendMail({
    from: `"AssetFlow" <${process.env.MAIL_FROM}>`,
    to: email,
    subject:
      "Verify your AssetFlow account",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>AssetFlow Email Verification</h2>

        <p>Your verification OTP is:</p>

        <h1 style="letter-spacing: 4px;">
          ${otp}
        </h1>

        <p>
          This OTP will expire in
          10 minutes.
        </p>
      </div>
    `,
  });
};

export const sendBookingApprovedEmail =
  async (
    email,
    assetName,
    location,
    endDate,
    adminEmail
  ) => {
    await transporter.sendMail({
      from: `"AssetFlow" <${process.env.MAIL_FROM}>`,
      to: email,
      subject:
        "Booking Approved - AssetFlow",

      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
      
        <h2>
          Your booking request has been approved.
        </h2>

        <p>
          <strong>Asset:</strong>
          ${assetName}
        </p>

        <p>
          <strong>Collection Location:</strong>
          ${location}
        </p>

        <p>
          <strong>Admin Contact:</strong>
          ${adminEmail}
        </p>

        <p>
          <strong>Return Before:</strong>
          ${new Date(
            endDate
          ).toLocaleDateString()}
        </p>

        <hr>

        <p>
          Please collect the asset from
          the mentioned location.
        </p>

        <p>
          After collection, kindly email
          the administrator with a photo
          of the collected asset.
        </p>

        <p>
          Failure to return the asset
          before the deadline may result
          in administrative action.
        </p>

      </div>
      `,
    });
  };

export const sendBookingRejectedEmail =
  async (
    email,
    reason
  ) => {
    await transporter.sendMail({
      from: `"AssetFlow" <${process.env.MAIL_FROM}>`,
      to: email,
      subject:
        "Booking Request Rejected",

      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">

        <h2>
          Your booking request was rejected.
        </h2>

        <p>
          <strong>Reason:</strong>
        </p>

        <p>
          ${reason}
        </p>

      </div>
      `,
    });
  };

export const sendMaintenanceEmail =
  async (
    adminEmail,
    assetName,
    reporterName,
    issue,
    severity
  ) => {
    await transporter.sendMail({
      from: `"AssetFlow" <${process.env.MAIL_FROM}>`,
      to: adminEmail,
      subject:
        "New Maintenance Report",

      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">

        <h2>
          Maintenance Report Submitted
        </h2>

        <p>
          <strong>Asset:</strong>
          ${assetName}
        </p>

        <p>
          <strong>Reported By:</strong>
          ${reporterName}
        </p>

        <p>
          <strong>Severity:</strong>
          ${severity}
        </p>

        <p>
          <strong>Issue:</strong>
        </p>

        <p>
          ${issue}
        </p>

      </div>
      `,
    });
  };

export const sendAssetReturnedEmail =
  async (
    adminEmail,
    assetName,
    userName
  ) => {
    await transporter.sendMail({
      from: `"AssetFlow" <${process.env.MAIL_FROM}>`,
      to: adminEmail,
      subject:
        "Asset Returned",

      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">

        <h2>
          Asset Returned
        </h2>

        <p>
          <strong>Asset:</strong>
          ${assetName}
        </p>

        <p>
          <strong>Returned By:</strong>
          ${userName}
        </p>

      </div>
      `,
    });
  };

export const sendMaintenanceResolvedEmail =
  async (
    email,
    assetName
  ) => {
    await transporter.sendMail({
      from: `"AssetFlow" <${process.env.MAIL_FROM}>`,
      to: email,
      subject:
        "Maintenance Report Resolved",

      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">

        <h2>
          Maintenance Issue Resolved
        </h2>

        <p>
          The maintenance report for
          <strong>
            ${assetName}
          </strong>
          has been resolved.
        </p>

        <p>
          Thank you for helping us
          maintain the inventory.
        </p>

      </div>
      `,
    });
  };