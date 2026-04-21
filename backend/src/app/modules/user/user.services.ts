import type { HydratedDocument } from "mongoose";
import AppError from "../../utils/AppError";
import generateOtp from "../../utils/otpGenerator";
import { Otp } from "../auth/auth.model";
import type { TUser } from "./user.interface";
import User from "./user.model";
import emailTemplate from "../../utils/emailTemplate";
import sendEmail from "../../utils/sendEmail";
import mongoose from "mongoose";

export const signUpWithEmailService = async (payload: TUser) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new AppError("User with this email already exists!", 409);
  }

  const newOtp = await generateOtp();

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await User.create([payload], { session });

    await Otp.create(
      [
        {
          email: payload.email,
          otp: newOtp,
          otpFor: "account-activation",
        },
      ],
      { session },
    );

    await session.commitTransaction();
    await session.endSession();

    const emailHTML = emailTemplate({
      title: "Activate Your Account",
      message: "Use the OTP below to activate your account:",
      otp: newOtp,
    });

    await sendEmail(payload.email, "Activate Your Account", emailHTML);

    const userData = (newUser[0] as HydratedDocument<TUser>).toObject();
    delete userData.password;

    return userData;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.error("Error during user sign-up:", error);
    throw new AppError("Failed to sign up user. Please try again later.", 500);
  }
};
