import { model, Schema } from "mongoose";
import {
  type TDailyTask,
  type TFinalChallenge,
  type TGoal,
  type TTask,
} from "./goal.interface";

const goalSchema = new Schema<TGoal>(
  {
    userID: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
      index: true,
    },

    name: {
      type: String,
      required: [true, "Goal name is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [250, "Description is too long"],
    },

    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 day"],
      max: [365, "Duration cannot exceed 365 days"],
    },

    timePerDay: {
      type: Number,
      required: [true, "Time per day is required"],
      min: [1, "Time per day must be at least 1 day"],
      max: [365, "Duration cannot exceed 24 days"],
    },

    finalGoal: {
      type: String,
      required: [true, "Final goal is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: {
        values: ["active", "inactive", "close"],
        message: "Status must be active, inactive, or close",
      },
      default: "inactive",
    },

    startingDate: {
      type: Date,
    },

    progress: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const taskSchema = new Schema<TTask>(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Task description is required"],
      trim: true,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const dailyTaskSchema = new Schema<TDailyTask>({
  goalID: {
    type: Schema.Types.ObjectId,
    required: [true, "Goal ID is required"],
    ref: "Goal",
    index: true,
  },

  day: {
    type: Number,
    required: [true, "Day is required"],
    min: [1, "Day must be at least 1"],
  },

  motivation: {
    type: String,
    required: [true, "Motivation is required"],
    trim: true,
  },

  tasks: {
    type: [taskSchema],
    required: [true, "Tasks are required"],
    validate: {
      validator: (v: unknown[]) => Array.isArray(v) && v.length > 0,
      message: "At least one task is required",
    },
  },
});

const finalChallengeSchema = new Schema<TFinalChallenge>(
  {
    goalID: {
      type: Schema.Types.ObjectId,
      required: [true, "Goal ID is required"],
      ref: "Goal",
      index: true,
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Goal = model<TGoal>("Goal", goalSchema);
const DailyTask = model<TDailyTask>("DailyTask", dailyTaskSchema);
const FinalChallenge = model<TFinalChallenge>(
  "FinalChallenge",
  finalChallengeSchema,
);

export { Goal, DailyTask, FinalChallenge };
