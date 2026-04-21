import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  changePasswordService,
  forgotPasswordService,
  getMeService,
  signinWithEmailService,
  verifyEmailService,
} from "./auth.services";

export const verifyEmail = catchAsync(async (req, res) => {
  const { email, otp } = req.body;
  const result = await verifyEmailService(email, otp);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Email verified successfully",
    data: result,
  });
});

export const signin = catchAsync(async (req, res) => {
  const result = await signinWithEmailService(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Signin successful!",
    data: result,
  });
});

export const changePassword = catchAsync(async (req, res) => {
  const result = await changePasswordService(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password changed successfully!",
    data: result,
  });
});

export const getMe = catchAsync(async (req, res) => {
  const { email } = req.user!;
  const result = await getMeService(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile retrieved successfully!",
    data: result,
  });
});

export const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await forgotPasswordService(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "OTP sent to email successfully!",
    data: result,
  });
});
