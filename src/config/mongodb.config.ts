import mongoose from "mongoose";
import { envsConfig } from "./envs.config.ts";
import { logger } from "../common/utils/loggers.ts";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(envsConfig.DB_URL, {
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 30000,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      bufferCommands: false,
    });
    logger.info(`MongoDB Connected 🌱`);
  } catch (error) {
    logger.error("MongoDB connection error ❌", error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    logger.info("MongoDB disconnected 📴");
  } catch (error) {
    logger.error("Error disconnecting MongoDB ❌", error);
  }
};
