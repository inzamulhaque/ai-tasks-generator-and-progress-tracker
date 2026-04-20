import { Router } from "express";
import AuthRouters from "../app/modules/auth/auth.route";

const router = Router();

const moduleRouters = [
  {
    path: "/auth",
    route: AuthRouters,
  },
];

moduleRouters.forEach(({ path, route }) => router.use(path, route));

export default router;
