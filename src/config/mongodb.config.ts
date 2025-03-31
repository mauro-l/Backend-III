import mongoose from "mongoose";
import { envsConfig } from "./envs.config.ts";
import { logger } from "../common/utils/loggers.ts";

export const connectDB = () => {
  try {
    mongoose.connect(envsConfig.DB_URL);
    logger.info("MongoDB connected 🌱");
  } catch (err) {
    logger.error("MongoDB connection error ❌", err);
  }
};
