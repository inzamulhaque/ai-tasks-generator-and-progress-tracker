import z from "zod";

export const validateSignUpWithEmailSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),

    email: z.templateLiteral([z.string().min(1), "@", z.string().max(64)]),

    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});
