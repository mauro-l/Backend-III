import express from "express";
import cors from "cors";
import router from "./routes/index.routes.ts";
import { envsConfig } from "./config/envs.config.ts";
import { logger } from "./common/utils/loggers.ts";
import { connectDB, disconnectDB } from "./config/mongodb.config.ts";
import { customError } from "./common/errors/customError.ts";
import swaggerUiExpress from "swagger-ui-express";
import { swaggerOptions } from "./config/swagger.config.ts";
import {
  globalLimitMiddleware,
  ipRateLimiter,
} from "./common/middlewares/rateLimiter.ts";

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (envsConfig.ENVIRONMENT === "PROD") {
  app.use("/api", ipRateLimiter);
  app.use("/api", globalLimitMiddleware);
}

app.use("/api", router);

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerOptions, { explorer: true })
);
app.use(customError);

// Solo ejecutar listen si NO estamos en Vercel
if (envsConfig.ENVIRONMENT !== "PROD") {
  app.listen(envsConfig.PORT, () => {
    logger.info(`Server is running ⚡️ at http://localhost:${envsConfig.PORT}`);
  });
  logger.info(
    `API docs 📑 available at http://localhost:${envsConfig.PORT}/docs`
  );
}

// Graceful shutdown
process.on("SIGINT", async () => {
  logger.info(
    "Shutting down server and disconnecting from MongoDB gracefully..."
  );
  await disconnectDB();
  process.exit(0);
});
