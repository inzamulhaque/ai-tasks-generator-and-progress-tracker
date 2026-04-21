import mongoose from "mongoose";
import AppError from "../../utils/AppError";
import User from "../user/user.model";
import { Otp } from "./auth.model";

export const verifyEmailService = async (email: string, otp: number) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const userOtp = await Otp.findOne({ email });
  if (!userOtp) {
    throw new AppError("OTP not found", 404);
  }

  const now = new Date().getTime();
  const createdTime = new Date(userOtp?.createdAt!).getTime();

  const diffInMs = now - createdTime;
  const fiveMinutesMs = 5 * 60 * 1000;

  if (diffInMs > fiveMinutesMs) {
    throw new AppError("OTP has expired", 400);
  }

  if (userOtp.otp !== otp) {
    throw new AppError("Invalid OTP", 400);
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    await user.updateOne({ status: "active" }, { new: true }).session(session);

    await Otp.deleteOne({
      email,
      otp,
    }).session(session);

    const restult = await User.findOne(
      { email },
      {
        password: 0,
      },
    ).session(session);

    await session.commitTransaction();
    await session.endSession();

    return restult;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.error("Error updating user status:", error);
    throw new AppError("Failed to update user status", 500);
  }
};
