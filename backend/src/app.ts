import express, { type Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index";

const app: Application = express();
app.use(
  cors({
    origin: "*",
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", router);

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Welcome to the AI Tasks Generator and Progress Tracker API",
    success: true,
    statusCode: 200,
  });
});

export default app;
