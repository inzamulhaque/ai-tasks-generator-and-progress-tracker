import { Router } from "express";
import UserRouters from "../app/modules/user/user.route";
import AuthRouters from "../app/modules/auth/auth.route";
import goalRoutes from "../app/modules/goal/goal.route";

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
];

moduleRouters.forEach(({ path, route }) => router.use(path, route));

export default router;
