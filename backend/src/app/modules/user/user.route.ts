import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { validateSignUpWithEmailSchema } from "./user.validation";
import { signUpWithEmail } from "./user.controller";

const router = express.Router();

router.post(
  "/signup-with-email",
  validateRequest(validateSignUpWithEmailSchema),
  signUpWithEmail,
);

const UserRouters = router;

export default UserRouters;
