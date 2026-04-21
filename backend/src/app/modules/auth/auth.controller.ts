import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { verifyEmailService } from "./auth.services";

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
