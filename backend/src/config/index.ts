import * as dotenv from "dotenv";
import * as path from "path";

declare const process: any;

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  PORT: process.env.PORT || 7000,
  DATABASE_URL: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  EMAIL: {
    ADDRESS: process.env.EMAIL,
    PASSWORD: process.env.EMAIL_PASS,
  },
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
};

export default config;
