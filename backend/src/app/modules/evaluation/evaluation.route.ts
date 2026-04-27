import { Router } from "express";
import auth from "../../middlewares/auth";
import { evaluation, getAllEvaluations } from "./evaluation.controller";

const router = Router();

router.post("/evaluate-goal/:goalID", auth, evaluation);

router.get("/all-evaluation/:goalID", auth, getAllEvaluations);

const evaluationRouter = router;
export default evaluationRouter;
