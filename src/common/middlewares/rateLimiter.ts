import type { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import { DailyLimit } from "../../modules/limits/limits.model.ts";

/**
 * Middleware para limitar la cantidad de peticiones a la API.
 * Limita a 100 peticiones por IP cada 15 minutos.
 */

async function getDailyCounter() {
  const today = new Date().toISOString().split("T")[0];

  let dailyCounter = await DailyLimit.findOne({ date: today });

  if (!dailyCounter) {
    dailyCounter = await DailyLimit.create({ date: today, count: 0 });
  }

  return dailyCounter;
}

// Middleware para verificar el límite global diario
export const globalLimitMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Excluir endpoint de verificación de límites y docs de Swagger
  if (req.path === "/api/limits/status" || req.path.startsWith("/docs")) {
    return next();
  }

  getDailyCounter()
    .then((dailyCounter) => {
      if (dailyCounter.count >= dailyCounter.limit) {
        res.status(429).json({
          success: false,
          message:
            "Se ha alcanzado el límite diario de consultas. Por favor, inténtalo mañana o contáctame para aumentar tu cuota.",
        });
        return;
      }

      // Incrementar contador y continuar
      return DailyLimit.updateOne(
        { date: dailyCounter.date },
        { $inc: { count: 1 } }
      ).then(() => {
        res.setHeader(
          "X-Daily-Limit-Remaining",
          String(dailyCounter.limit - dailyCounter.count - 1)
        );
        res.setHeader("X-Daily-Limit-Limit", String(dailyCounter.limit));
        next();
      });
    })
    .catch((err) => {
      next(err); // Continuar incluso si hay error para evitar bloqueos completos
    });
};

export const ipRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 15, // Límite de 15 solicitudes por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Demasiadas solicitudes desde esta IP. Por favor, inténtalo de nuevo más tarde.",
  },
});
