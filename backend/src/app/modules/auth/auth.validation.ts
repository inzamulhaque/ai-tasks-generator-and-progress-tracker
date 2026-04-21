import z from "zod";

export const validateEmailVerifySchema = z.object({
  body: z.object({
    email: z.templateLiteral([z.string().min(1), "@", z.string().max(64)]),
    otp: z.number().min(10000).max(99999),
  }),
});
