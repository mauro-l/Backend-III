import type { Request, Response } from "express";
import mongoose from "mongoose";

// Endpoint para verificar que tu API esté funcionando
export const healthCheck = (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    message: "API funcionando correctamente",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
};
