import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createGoalService, getMyAllGoalsService } from "./goal.services";

export const createGoal = catchAsync(async (req, res) => {
  const { email } = req.user!;
  const { goalName, goalDuration, timePerDay, goalDescription, language } =
    req.body;

  const result = await createGoalService(
    email,
    goalName,
    goalDuration,
    timePerDay,
    goalDescription,
    language,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Goal created successfully!",
    data: result,
  });
});

export const getMyAllGoals = catchAsync(async (req, res) => {
  const { email } = req.user!;

  const result = await getMyAllGoalsService(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Goals retrieve successfully!",
    data: result,
  });
});
