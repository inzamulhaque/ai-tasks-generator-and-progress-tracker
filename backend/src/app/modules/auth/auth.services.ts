import mongoose from "mongoose";
import AppError from "../../utils/AppError";
import User from "../user/user.model";
import bcrypt from "bcrypt";
import { Otp } from "./auth.model";
import { jwtUtils } from "../../utils/jwt";

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

export const signinWithEmailService = async (payload: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.status !== "active") {
    throw new AppError(
      "Email not verified! Please verify your email first or reset your password.",
      400,
    );
  }

  const isPasswordValid = await bcrypt.compare(
    payload.password,
    user.password!,
  );

  if (!isPasswordValid) {
    throw new AppError("Invalid password", 400);
  }

  const token = jwtUtils.generateToken({ email: user.email });
  return { token };
};

export const changePasswordService = async (payload: {
  email: string;
  oldPassword: string;
  newPassword: string;
}) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isOldPasswordValid = await bcrypt.compare(
    payload.oldPassword,
    user.password!,
  );

  if (!isOldPasswordValid) {
    throw new AppError("Invalid old password", 400);
  }

  if (payload.oldPassword === payload.newPassword) {
    throw new AppError("New password must be different from old password", 400);
  }

  const hashedNewPassword = await bcrypt.hash(payload.newPassword, 12);
  const result = await user.updateOne({ password: hashedNewPassword });

  if (result.modifiedCount === 0) {
    throw new AppError("Failed to change password", 500);
  }

  return { message: "Password changed successfully" };
};
