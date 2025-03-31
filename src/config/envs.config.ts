import * as dotenv from "dotenv";

dotenv.config();

export const envsConfig = {
  PORT: process.env.PORT || 8080,
  DB_URL: process.env.DATABASE_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  NODE_ENV: process.env.NODE_ENV || "development",
};
