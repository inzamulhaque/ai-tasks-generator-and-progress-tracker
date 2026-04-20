import { Router } from "express";
import UserRouters from "../app/modules/user/user.route";

const router = Router();

const moduleRouters = [
  {
    path: "/user",
    route: UserRouters,
  },
];

moduleRouters.forEach(({ path, route }) => router.use(path, route));

export default router;
