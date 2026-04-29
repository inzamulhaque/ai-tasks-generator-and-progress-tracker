import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  validateChangePasswordSchema,
  validateEmailVerifySchema,
  validateForgotPasswordSchema,
  validateOtpValidationSchema,
  validateResetPasswordSchema,
  validateSigninSchema,
  validateSigninWithGoogleSchema,
} from "./auth.validation";
import {
  changePassword,
  forgotPassword,
  getMe,
  resetPassword,
  signin,
  signinWithGoogle,
  verifyEmail,
  verifyForgotPasswordOtp,
} from "./auth.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/email-verify",
  validateRequest(validateEmailVerifySchema),
  verifyEmail,
);

router.post("/signin", validateRequest(validateSigninSchema), signin);

router.post(
  "/change-password",
  auth,
  validateRequest(validateChangePasswordSchema),
  changePassword,
);

router.get("/me", auth, getMe);

router.post(
  "/forgot-password",
  validateRequest(validateForgotPasswordSchema),
  forgotPassword,
);

router.post(
  "/verify-otp",
  validateRequest(validateOtpValidationSchema),
  verifyForgotPasswordOtp,
);

router.patch(
  "/reset-password",
  auth,
  validateRequest(validateResetPasswordSchema),
  resetPassword,
);

router.post(
  "/signin-with-google",

  validateRequest(validateSigninWithGoogleSchema),
  signinWithGoogle,
);

const AuthRouters = router;

export default AuthRouters;
