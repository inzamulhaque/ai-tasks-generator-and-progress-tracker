import { model, Schema } from "mongoose";
import type { TOtp } from "./auth.interface";

const otpSchema = new Schema<TOtp>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email"],
    },

    otp: {
      type: Number,
      required: [true, "OTP is required"],
      min: [10000, "OTP must be 5 digits"],
      max: [99999, "OTP must be 5 digits"],
    },

    otpFor: {
      type: String,
      required: [true, "OTP purpose is required"],
      enum: {
        values: ["account-activation", "password-reset", "resend-otp"],
        message: "Invalid OTP purpose",
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Otp = model<TOtp>("otp", otpSchema);
