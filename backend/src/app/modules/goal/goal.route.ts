import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { validateCreateGoalSchema } from "./goal.validation";
import { createGoal } from "./goal.controller";

const router = Router();

router.post(
  "/create",
  auth,
  validateRequest(validateCreateGoalSchema),
  createGoal,
);

const goalRoutes = router;
export default goalRoutes;
