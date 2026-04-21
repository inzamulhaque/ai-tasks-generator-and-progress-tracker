import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  changePasswordService,
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
