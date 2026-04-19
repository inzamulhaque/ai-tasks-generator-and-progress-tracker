import jwt from "jsonwebtoken";
import config from "../../config/index.js";

const generateToken = (
  payload: { email: string },
  expiresIn: string = "1d",
) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn } as jwt.SignOptions);
};

const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, config.jwtSecret);
  return decoded;
};

export const jwtUtils = {
  generateToken,
  verifyToken,
};
