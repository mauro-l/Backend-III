import * as dotenv from "dotenv";
import { logger } from "../common/utils/loggers.ts";

// Detectar el entorno basado en el script de ejecución
const getEnvironment = (): "DEV" | "QA" | "PROD" => {
  //Verificar primero NODE_ENV (Vercel lo setea)
  if (process.env.NODE_ENV === "production") return "PROD";

  //Utiliza process.env.npm_lifecycle_event
  //que contiene el nombre del script que se está ejecutando actualmente.
  const scriptCommand = process.env.npm_lifecycle_event || "";

  if (scriptCommand.includes("qa")) return "QA";
  if (scriptCommand.includes("prod")) return "PROD";
  return "DEV"; // Valor por defecto
};

const environment = getEnvironment();
logger.info(`Running in ${environment} environment`);

// Seleccionar el archivo .env adecuado
//Si necesitas agregar nuevos entornos en el futuro (como "STAGING" o "TESTING"),
// simplemente agregas una nueva entrada al objeto envFiles.
const envFiles = {
  DEV: "./.env.dev",
  QA: "./.env.qa",
  PROD: "./.env.prod",
};

// En producción (Vercel), no cargar archivo .env
if (environment !== "PROD") {
  const envPath = envFiles[environment] || "./.env.dev";
  dotenv.config({
    path: envPath,
    override: true,
  });
}

// Usar la ruta completa del archivo .env correspondiente
const envPath = envFiles[environment] || "./.env.dev"; // Usa .env.dev como fallback

// Cargar variables de entorno desde el archivo seleccionado
dotenv.config({
  path: envPath,
  override: true,
});
//Al agregar override: true, nos aseguramos de que las variables en el
// archivo específico (.env.qa, .env.dev) tengan prioridad sobre cualquier otro.

export const envsConfig = {
  PORT: process.env.PORT || 8080,
  DB_URL: process.env.DATABASE_URL || process.env.MONGODB_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  NODE_ENV: process.env.NODE_ENV || "development",
  ENVIRONMENT: environment, // Exportamos también el entorno detectado
};
