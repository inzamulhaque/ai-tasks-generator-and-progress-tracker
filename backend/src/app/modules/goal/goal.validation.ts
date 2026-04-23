import { z } from "zod";

export const validateCreateGoalSchema = z.object({
  body: z.object({
    goalName: z
      .string()
      .min(3, { message: "Goal name must be at least 3 characters" })
      .max(100, { message: "Goal name is too long" }),

    goalDuration: z
      .number()
      .int({ message: "Duration must be an integer" })
      .min(1, { message: "Duration must be at least 1 day" })
      .max(365, { message: "Duration cannot exceed 365 days" }),

    timePerDay: z
      .number()
      .int({ message: "Duration must be an integer" })
      .min(1, { message: "Time per day must be at least 1 hour" })
      .max(24, { message: "Time per day cannot exceed 24 hours" }),

    goalDescription: z
      .string()
      .min(10, { message: "Description must be at least 10 characters" })
      .max(500, { message: "Description is too long" }),

    language: z
      .string()
      .min(2, { message: "Language must be valid" })
      .max(30, { message: "Language is too long" }),
  }),
});
