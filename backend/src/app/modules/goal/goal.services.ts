import mongoose from "mongoose";
import openAI from "../../../config/openai.config";
import goalSchema from "./goal.schema.json";
import AppError from "../../utils/AppError";
import User from "../user/user.model";
import { DailyTask, FinalChallenge, Goal } from "./goal.model";
import type { TDailyTask, TFinalChallenge } from "./goal.interface";

export const createGoalService = async (
  email: string,
  goalName: string,
  goalDuration: number,
  timePerDay: number,
  goalDescription: string,
  language: string,
) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new AppError("User Not Found!", 404);
  }

  const propmt = `
    You are a goal planning assistant. Respond ONLY with a valid JSON object.
    No markdown, no explanation, no code blocks. Start with { and end with }.

    GOAL DETAILS:
      - Goal: ${goalName}
      - Duration: ${goalDuration} days
      - Time per day: ${timePerDay} hours
      - Description: ${goalDescription}

    LANGUAGE RULE:
      - All JSON keys must be in English (exactly as shown below)
      - All text values must be written in ${language === "bangla" ? "Bangla (বাংলা)" : "English"}


    Return complete JSON in a single response. Do not stream or split.

    DO NOT use placeholders like ???
    All fields must be meaningful
    `;

  const aiResponse = await openAI.chat.completions.create({
    model: "openai/gpt-oss-120b:free",
    messages: [
      {
        role: "system",
        content:
          "You are an expert in personal productivity coach and learning specialist.",
      },

      {
        role: "user",
        content: propmt,
      },
    ],

    temperature: 0.7,

    stream: false,

    response_format: {
      type: "json_schema",
      json_schema: {
        name: "goal_schema",
        schema: goalSchema,
      },
    },
  });

  const content = aiResponse.choices[0]!.message.content;

  let goal;

  try {
    goal = JSON.parse(content!);
  } catch (err) {
    console.error("Invalid JSON from AI:", content);
    throw new AppError("AI response invalid!", 500);
  }

  if (!goal?.dailyTasks || !Array.isArray(goal.dailyTasks)) {
    throw new AppError("AI dailyTasks missing!", 500);
  }

  if (!goal?.finalChallenges || !Array.isArray(goal.finalChallenges)) {
    throw new AppError("AI finalChallenges missing!", 500);
  }

  const session = await mongoose.startSession();

  try {
    await session.startTransaction();
    const createdGoal = await Goal.create(
      [
        {
          userID: user!._id,
          name: goal.name,
          description: goal.description,
          duration: goalDuration,
          timePerDay,
          finalGoal: goal.finalGoal,
        },
      ],
      {
        session,
      },
    );

    const goalID = createdGoal[0]!._id;

    const dailyTask: TDailyTask[] = goal.dailyTasks.map(
      (DT: Omit<TDailyTask, "goalID">) => ({
        goalID,
        ...DT,
      }),
    );

    await DailyTask.create(dailyTask, { session, ordered: true });

    const finalChallenges: TFinalChallenge[] = goal.finalChallenges.map(
      (FC: Omit<TFinalChallenge, "goalID">) => ({
        goalID,
        ...FC,
      }),
    );

    await FinalChallenge.create(finalChallenges, { session, ordered: true });
    await session.commitTransaction();
    await session.endSession();

    return createdGoal;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.error(error);
    throw new AppError("Goal not created!", 500);
  }
};

export const getMyAllGoalsService = async (email: string) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new AppError("User Not Found!", 404);
  }

  const allGoals = await Goal.find({
    userID: user._id,
  });

  return allGoals;
};

export const getGoalByIdService = async (email: string, goalID: string) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new AppError("User Not Found!", 404);
  }

  const goal = await Goal.findOne({
    userID: user._id,
    _id: goalID,
  }).lean();

  if (!goal) {
    throw new AppError("Goal not found!", 404);
  }

  const dailyTaskOverView = await DailyTask.find(
    {
      goalID,
    },
    {
      day: 1,
      "tasks.title": 1,
    },
  );

  const finalChallenges = await FinalChallenge.find(
    {
      goalID,
    },
    {
      title: 1,
      _id: 0,
    },
  );

  return {
    ...goal,
    dailyTaskOverView,
    finalChallenges,
  };
};

export const startAchieveGoalService = async (
  email: string,
  goalID: string,
) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new AppError("User Not Found!", 404);
  }

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    await Goal.findOneAndUpdate(
      {
        _id: goalID,
        userID: user._id,
      },
      {
        $set: {
          startingDate: new Date(),
          status: "active",
          progress: 1,
        },
      },
      { session },
    );

    const day1Tasks = await DailyTask.findOne(
      {
        goalID,
        day: 1,
      },
      null,
      { session },
    ).lean();

    await session.commitTransaction();
    await session.endSession();

    return day1Tasks;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.error(error);
    throw new AppError("Internal server error!", 500);
  }
};

export const nextDayService = async (email: string, goalID: string) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new AppError("User Not Found!", 404);
  }

  const goal = await Goal.findOne({
    _id: goalID,
    userID: user._id,
  }).lean();

  if (!goal) {
    throw new AppError("Goal not found!", 404);
  }

  if (!goal.progress || goal.progress < 1 || goal.progress === goal.duration) {
    throw new AppError("Goal is not active!", 404);
  }

  const currentDayTasks = await DailyTask.findOne({
    goalID,
    day: goal.progress,
  }).lean();

  if (!currentDayTasks) {
    throw new AppError("Current day task not found!", 404);
  }

  const allTasksDone = currentDayTasks.tasks.every(
    (task) => task.isCompleted === true,
  );

  if (!allTasksDone) {
    throw new AppError("Please complete all tasks!", 404);
  }

  const currentDay = goal.progress || 0;
  const nextDay = currentDay + 1;

  const goalStatus = currentDay == goal.duration ? "close" : goal.status;

  const session = await mongoose.startSession();

  try {
    await session.startTransaction();

    await Goal.updateOne(
      {
        _id: goalID,
        userID: user._id,
      },
      {
        $set: {
          progress: nextDay,
          status: goalStatus,
        },
      },
      {
        session,
      },
    );

    const nextTasks = await DailyTask.findOne(
      {
        goalID: goal._id,
        day: nextDay,
      },
      null,
      { session },
    ).lean();

    return nextTasks;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.error(error);
    throw new AppError("Internal server error!", 500);
  }
};

export const completedTaskService = async (taskId: string) => {
  const updatedTask = await DailyTask.findOneAndUpdate(
    {
      "tasks._id": taskId,
    },
    {
      $set: {
        "tasks.$.isCompleted": true,
      },
    },
    {
      new: true,
    },
  );

  return updatedTask;
};

export const getFinalChallengesService = async (goalID: string) => {
  const goal = await Goal.findById(goalID);

  if (!goal) {
    throw new AppError("Goal not found!", 404);
  }

  if (goal.duration !== goal.progress) {
    throw new AppError("Please complete your daily tasks!", 400);
  }

  const challenges = await FinalChallenge.find({
    goalID,
  });

  return challenges;
};
