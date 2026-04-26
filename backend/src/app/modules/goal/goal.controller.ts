import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  completeChallengesService,
  completedTaskService,
  createGoalService,
  getFinalChallengesService,
  getGoalByIdService,
  getMyAllGoalsService,
  nextDayService,
  startAchieveGoalService,
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

export const startAchieveGoal = catchAsync(async (req, res) => {
  const { email } = req.user!;
  const { goalID } = req.params;

  const result = await startAchieveGoalService(email, goalID as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Start working successfully!",
    data: result,
  });
});

export const nextDay = catchAsync(async (req, res) => {
  const { email } = req.user!;
  const { goalID } = req.params;

  const result = await nextDayService(email, goalID as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get next day tasks successfully!",
    data: result,
  });
});

export const completedTask = catchAsync(async (req, res) => {
  const { taskID } = req.params;

  const result = await completedTaskService(taskID as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task completed successfully!",
    data: result,
  });
});

export const getFinalChallenges = catchAsync(async (req, res) => {
  const { goalID } = req.params;

  const result = await getFinalChallengesService(goalID as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Final challenges retrieve successfully!",
    data: result,
  });
});

export const completeChallenges = catchAsync(async (req, res) => {
  const { chngID } = req.params;

  const result = await completeChallengesService(chngID as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Complete challenge successfully!",
    data: result,
  });
});
