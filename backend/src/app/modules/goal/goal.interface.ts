import type { Date, Types } from "mongoose";

export type TGoal = {
  userID: Types.ObjectId;
  name: string;
  description: string;
  duration: number;
  timePerDay: number;
  finalGoal: string;
  status?: "active" | "inactive" | "close";
  startingDate?: Date;
  progress?: number;
};

export type TFinalChallenge = {
  goalID: Types.ObjectId;
  title: string;
  description: string;
  isCompleted?: boolean;
};

export type TDailyTask = {
  goalID: Types.ObjectId;
  day: number;
  motivation: string;
  tasks: TTask[];
};

export type TTask = {
  title: string;
  description: string;
  isCompleted?: boolean;
};
