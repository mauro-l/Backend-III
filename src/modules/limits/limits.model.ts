import mongoose from "mongoose";

// Esquema para el contador global diario
const dailyLimitSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  limit: { type: Number, default: 1000 }, // Límite diario global
});

// Si el modelo ya existe, usarlo; si no, crearlo
export const DailyLimit = mongoose.model("DailyLimit", dailyLimitSchema);
