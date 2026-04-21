import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  validateChangePasswordSchema,
  validateEmailVerifySchema,
  validateForgotPasswordSchema,
  validateSigninSchema,
} from "./auth.validation";
import {
  changePassword,
  forgotPassword,
  getMe,
  signin,
  verifyEmail,
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

const AuthRouters = router;

export default AuthRouters;
