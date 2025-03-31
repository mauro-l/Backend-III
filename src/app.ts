import express from "express";
import { envsConfig } from "./config/envs.config.ts";
import { logger } from "./common/utils/loggers.ts";
import { connectDB } from "./config/mongodb.config.ts";

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(envsConfig.PORT, () => {
  logger.info(`Server is running ⚡️ at http://localhost:${envsConfig.PORT}`);
});
