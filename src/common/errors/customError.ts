import type { ErrorRequestHandler } from "express";
import { logger } from "../utils/loggers.js";

export const customError: ErrorRequestHandler = (err, req, res, next) => {
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
      `Status: ${statusCode} [${req.method}] ${req.originalUrl} - ${err.message}`
    );
    logger.error(JSON.stringify(error, null, 2));
  } else {
    logger.debug(JSON.stringify(error, null, 2));
  }
  res.status(statusCode).json({ message });
};
