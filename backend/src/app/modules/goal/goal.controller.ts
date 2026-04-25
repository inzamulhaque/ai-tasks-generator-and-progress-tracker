import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createGoalService,
  getGoalByIdService,
  getMyAllGoalsService,
} from "./goal.services";

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

export const getGoalById = catchAsync(async (req, res) => {
  const { email } = req.user!;
  const { goalID } = req.params;

  const result = await getGoalByIdService(email, goalID as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Goal retrieve successfully!",
    data: result,
  });
});
