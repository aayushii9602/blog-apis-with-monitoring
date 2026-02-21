import dotenv from "dotenv";
dotenv.config(); // always load first

import app from "./app";
import connectDB from "./config/db";
import logger from "./utils/logger";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    // connect database
    await connectDB();
    logger.info("Database connected successfully");

    // start server
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });

  } catch (error: any) {
    logger.error("Server startup failed", {
      message: error.message,
      stack: error.stack,
    });

    process.exit(1);
  }
}

start();