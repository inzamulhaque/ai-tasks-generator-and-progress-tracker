import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { validateCreateGoalSchema } from "./goal.validation";
import {
  completeChallenges,
  completedTask,
  createGoal,
  getFinalChallenges,
  getGoalById,
  getMyAllGoals,
  nextDay,
  startAchieveGoal,
} from "./goal.controller";

const router = Router();

router.post(
  "/create",
  auth,
  validateRequest(validateCreateGoalSchema),
  createGoal,
);

router.get("/my-all-goals", auth, getMyAllGoals);

router.get("/:goalID", auth, getGoalById);

router.get("/start/:goalID", auth, startAchieveGoal);

router.get("/get-next-day-tasks/:goalID", auth, nextDay);

router.patch("/complete-task/:taskID", auth, completedTask);

router.get("/final-challenges/:goalID", auth, getFinalChallenges);

router.patch("/complete-challenge/:chngID", auth, completeChallenges);

const goalRoutes = router;
export default goalRoutes;
