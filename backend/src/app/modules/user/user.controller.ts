import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { signUpWithEmailService } from "./user.services";

export const signUpWithEmail = catchAsync(async (req, res) => {
  const result = await signUpWithEmailService(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message:
      "User signed up successfully! Check your email to activate your account.",
    data: result,
  });
});
