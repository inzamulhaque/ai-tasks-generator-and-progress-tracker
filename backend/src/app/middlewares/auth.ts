import type { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { jwtUtils } from "../utils/jwt.js";
import jwt from "jsonwebtoken";
import { type JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        email: string;
      };
    }
  }
}

const auth = catchAsync(
  async (
    req: Request & { user?: { email: string } },
    res: Response,
    next: NextFunction,
  ) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError("Unauthorized!", 401);
    }

    try {
      const decoded = jwtUtils.verifyToken(token);
      req.user = decoded as { email: string };

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppError("Token expired! Please login again.", 401);
      }
    }
  },
);

export default auth;
