import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  validateChangePasswordSchema,
  validateEmailVerifySchema,
  validateSigninSchema,
} from "./auth.validation";
import { changePassword, signin, verifyEmail } from "./auth.controller";
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

const AuthRouters = router;

export default AuthRouters;
