import z from "zod";

export const validateEmailVerifySchema = z.object({
  body: z.object({
    email: z.templateLiteral([z.string().min(1), "@", z.string().max(64)]),
    otp: z.number().min(10000).max(99999),
  }),
});

export const validateSigninSchema = z.object({
  body: z.object({
    email: z.templateLiteral([z.string().min(1), "@", z.string().max(64)]),

    password: z.string().min(6).max(128),
  }),
});

export const validateChangePasswordSchema = z.object({
  body: z.object({
    email: z.templateLiteral([z.string().min(1), "@", z.string().max(64)]),

    oldPassword: z.string().min(6).max(128),

    newPassword: z.string().min(6).max(128),
  }),
});

export const validateForgotPasswordSchema = z.object({
  body: z.object({
    email: z.templateLiteral([z.string().min(1), "@", z.string().max(64)]),
  }),
});

export const validateOtpValidationSchema = z.object({
  body: z.object({
    email: z.templateLiteral([z.string().min(1), "@", z.string().max(64)]),

    otp: z.number().min(10000).max(99999),
  }),
});

export const validateResetPasswordSchema = z.object({
  body: z.object({
    password: z.string().min(6).max(128),
  }),
});
