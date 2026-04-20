import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { validateSignUpWithEmailSchema } from "./auth.validation";
import { signUpWithEmail } from "./auth.controller";

const router = express.Router();

router.post(
  "/signup-with-email",
  validateRequest(validateSignUpWithEmailSchema),
  signUpWithEmail,
);

const AuthRouters = router;

export default AuthRouters;
