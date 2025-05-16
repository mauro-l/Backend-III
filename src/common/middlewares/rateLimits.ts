import rateLimit from "express-rate-limit";

/**
 * Middleware para limitar la cantidad de peticiones a la API.
 * Limita a 100 peticiones por IP cada 15 minutos.
 */

export const loginRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 3, // máximo 3 intentos por IP por minuto
  message: {
    status: "error",
    message: "Too many login attempts, please try again later.",
  },
  standardHeaders: true, // incluye RateLimit-* headers
  legacyHeaders: false, // desactiva X-RateLimit-* headers
});
