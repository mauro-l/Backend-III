import express from "express";
import cors from "cors";
import router from "./routes/index.routes.ts";
import { envsConfig } from "./config/envs.config.ts";
import { logger } from "./common/utils/loggers.ts";
import { connectDB } from "./config/mongodb.config.ts";
import { customError } from "./common/errors/customError.ts";

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use(customError);

app.listen(envsConfig.PORT, () => {
  logger.info(`Server is running ⚡️ at http://localhost:${envsConfig.PORT}`);
});
