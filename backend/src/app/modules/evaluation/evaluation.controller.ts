import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  evaluationService,
  getAllEvaluationsService,
} from "./evaluation.services";

export const evaluation = catchAsync(async (req, res) => {
  const { email } = req.user!;
  const { goalID } = req.params;

  const result = await evaluationService(email, goalID as string);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Evaluate successfully!",
    data: result,
  });
});

export const getAllEvaluations = catchAsync(async (req, res) => {
  const { goalID } = req.params;

  const result = await getAllEvaluationsService(goalID as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Evaluate retrieve successfully!",
    data: result,
  });
});
