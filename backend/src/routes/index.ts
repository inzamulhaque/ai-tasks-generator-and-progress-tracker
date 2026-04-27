import { Router } from "express";
import UserRouters from "../app/modules/user/user.route";
import AuthRouters from "../app/modules/auth/auth.route";
import goalRoutes from "../app/modules/goal/goal.route";
import evaluationRouter from "../app/modules/evaluation/evaluation.route";

const router = Router();

const moduleRouters = [
  {
    path: "/user",
    route: UserRouters,
  },

  {
    path: "/auth",
    route: AuthRouters,
  },

  {
    path: "/goal",
    route: goalRoutes,
  },

  {
    path: "/evaluation",
    route: evaluationRouter,
  },
];

moduleRouters.forEach(({ path, route }) => router.use(path, route));

export default router;
