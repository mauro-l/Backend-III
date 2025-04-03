import type { Request, Response, NextFunction } from "express";
import { logger } from "../utils/loggers.js";
import type { CustomError } from "./appError.js";

export const customError = async (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Internal server error" : err.message;
  const stack = err.stack ? err.stack.split("\n") : [];

  const error = {
    statusCode,
    files: stack,
    message: err.message,
    path: req.originalUrl,
    method: req.method,
  };

  if (statusCode === 500) {
    logger.error(
      `Status: ${statusCode} [${req.method}] ${req.originalUrl} - Message: ${err.message}`
    );
    logger.error(JSON.stringify(error, null, 2));

    return res.status(statusCode).json({ message });
  }

  logger.debug(JSON.stringify(error, null, 2));

  res.status(statusCode).json({ message });
};
