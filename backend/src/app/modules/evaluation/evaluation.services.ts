import mongoose from "mongoose";
import AppError from "../../utils/AppError";
import { DailyTask, FinalChallenge, Goal } from "../goal/goal.model";
import User from "../user/user.model";
import openAI from "../../../config/openai.config";
import evaluationSchema from "./evaluation.schema.json";
import Evaluation from "./evaluation.model";

export const evaluationService = async (email: string, goalID: string) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new AppError("User Not Found!", 404);
  }

  const goal = await Goal.findById(goalID);

  if (!goal) {
    throw new AppError("Goal not Found!", 404);
  }

  if (!goal.startingDate) {
    throw new AppError("Goal not Started!", 404);
  }

  const tasksCount = await DailyTask.aggregate([
    {
      $match: {
        goalID: new mongoose.Types.ObjectId(goalID),
      },
    },

    {
      $project: {
        taskCount: { $size: "$tasks" },

        completedTasks: {
          $size: {
            $filter: {
              input: "$tasks",
              as: "task",
              cond: { $eq: ["$$task.isCompleted", true] },
            },
          },
        },
      },
    },

    {
      $group: {
        _id: null,
        totalTasks: { $sum: "$taskCount" },
        completedTasks: { $sum: "$completedTasks" },
      },
    },
  ]);

  const countChallenges = await FinalChallenge.aggregate([
    {
      $match: {
        goalID: new mongoose.Types.ObjectId(goalID),
      },
    },

    {
      $group: {
        _id: null,

        totalChallenges: {
          $sum: 1,
        },

        completedChallenges: {
          $sum: {
            $cond: [{ $eq: ["$isCompleted", true] }, 1, 0],
          },
        },
      },
    },
  ]);

  const prompt = `
    You are an expert Goal Achievement Evaluator and Productivity Coach.

    Analyze the user's progress toward their goal based on the provided data and generate a concise but actionable evaluation.

    DATA:
    Goal name: ${goal.name}
    Estimated duration: ${goal.duration} days
    Staring days: ${goal.startingDate}
    Today date: ${new Date()}
    Total tasks: ${tasksCount[0].totalTasks}
    Completed tasks: ${tasksCount[0].completedTasks}
    Total challenges: ${countChallenges[0].totalChallenges}
    Completed challenges: ${countChallenges[0].completedChallenges}

    Generate: 
      1. Performance analysis
      2. Specific encouragement 
      3. Recommend next action (just 1-3 lines)
      4. Tips

    Return complete JSON in a single response. Do not stream or split.

    DO NOT use placeholders like ???
    All fields must be meaningful
  `;

  const aiResponse = await openAI.chat.completions.create({
    model: "openai/gpt-oss-120b:free",
    messages: [
      {
        role: "system",
        content: `
          You are a supportive and smart productivity coach. Be encouraging but honest. Adapt your tone based on progress.
          `,
      },

      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 0.7,

    stream: false,

    response_format: {
      type: "json_schema",
      json_schema: {
        name: "evaluation_schema",
        schema: evaluationSchema,
      },
    },
  });

  const content = aiResponse.choices[0]!.message.content;

  let evaluation;

  try {
    evaluation = JSON.parse(content!);
  } catch (err) {
    console.error("Invalid JSON from AI:", content);
    throw new AppError("AI response invalid!", 500);
  }

  const result = await Evaluation.create({ goalID, ...evaluation });
  return result;
};

export const getAllEvaluationsService = async (goalID: string) => {
  const evaluations = await Evaluation.find({
    goalID,
  }).sort({ createdAt: -1 });

  return evaluations;
};
