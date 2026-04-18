import { Server } from "http";
import mongoose from "mongoose";
import config from "./config/index";
import app from "./app";

let server: Server;

const main = async () => {
  try {
    await mongoose.connect(config.DATABASE_URL as string);

    server = app.listen(config.port, () => {
      console.log(`http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

main();

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
