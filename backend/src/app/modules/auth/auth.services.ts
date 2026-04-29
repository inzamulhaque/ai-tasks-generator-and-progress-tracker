import mongoose from "mongoose";
import AppError from "../../utils/AppError";
import User from "../user/user.model";
import bcrypt from "bcrypt";
import { Otp } from "./auth.model";
import { jwtUtils } from "../../utils/jwt";
import generateOtp from "../../utils/otpGenerator";
import emailTemplate from "../../utils/emailTemplate";
import sendEmail from "../../utils/sendEmail";

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

export const getMeService = async (email: string) => {
  const user = await User.findOne({ email }, { password: 0 });

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  return user;
};

export const forgotPasswordService = async (email: string) => {
  const user = await User.findOne({ email }, { password: 0 });
  if (!user) {
    throw new AppError("User not found!", 404);
  }

  const newOtp = await generateOtp();

  const emailHTML = emailTemplate({
    title: "Forgot Password OTP",
    message: "Your OTP for password reset",
    otp: newOtp,
  });

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    await Otp.deleteOne({ email }).session(session);
    await Otp.create([{ email, otp: newOtp, otpFor: "password-reset" }], {
      session,
    });

    await session.commitTransaction();
    await session.endSession();

    await sendEmail(email, "Your OTP for Password Reset", emailHTML);

    return user;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.error("Error in forgot password service:", error);
    throw new AppError("Failed to process forgot password request!", 500);
  }
};

export const verifyForgotPasswordOtpService = async (payload: {
  email: string;
  otp: number;
}) => {
  const userOtp = await Otp.findOne({ email: payload.email });
  if (!userOtp) {
    throw new AppError("Otp not found!", 404);
  }

  const now = new Date().getTime();
  const createdTime = new Date(userOtp?.createdAt!).getTime();

  const diffInMs = now - createdTime;
  const fiveMinutesMs = 5 * 60 * 1000;

  if (diffInMs > fiveMinutesMs) {
    throw new AppError("OTP has expired!", 400);
  }

  if (userOtp.otp !== payload.otp) {
    throw new AppError("Invalid OTP!", 400);
  }

  const token = jwtUtils.generateToken({ email: userOtp.email }, "5m");

  return token;
};

export const resetPasswordService = async (email: string, password: string) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    throw new AppError("User not found!", 404);
  }

  const hashedNewPassword = await bcrypt.hash(password, 12);

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    await User.findOneAndUpdate(
      {
        email,
      },
      {
        $set: {
          password: hashedNewPassword,
        },
      },
      { session },
    );

    await Otp.findOneAndDelete(
      {
        email,
      },
      {
        session,
      },
    );

    await session.commitTransaction();
    await session.endSession();

    return {
      message: "Password reset successfully!",
    };
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.error("Error in reset password service:", error);
    throw new AppError("Failed to process reset password request!", 500);
  }
};

export const signinWithGoogleService = async (user: {
  name: string;
  email: string;
}) => {
  const result = await User.find({
    email: user.email,
  });

  if (!result) {
    await User.create(user);
  }

  const token = jwtUtils.generateToken({ email: user.email });
  return { token };
};
