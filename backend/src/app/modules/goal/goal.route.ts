import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { validateCreateGoalSchema } from "./goal.validation";
import { createGoal, getGoalById, getMyAllGoals } from "./goal.controller";

const router = Router();

router.post(
  "/create",
  auth,
  validateRequest(validateCreateGoalSchema),
  createGoal,
);

router.get("/my-all-goals", auth, getMyAllGoals);

router.get("/:goalID", auth, getGoalById);

const goalRoutes = router;
export default goalRoutes;
