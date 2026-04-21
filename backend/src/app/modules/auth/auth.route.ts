import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { validateEmailVerifySchema } from "./auth.validation";
import { verifyEmail } from "./auth.controller";

const router = Router();

router.post(
  "/email-verify",
  validateRequest(validateEmailVerifySchema),
  verifyEmail,
);

const AuthRouters = router;

export default AuthRouters;
