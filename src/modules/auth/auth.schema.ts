import { z } from "zod";

export const loginSchema = {
  body: z.object({
    email: z
      .string()
      .email("Invalid email format")
      .refine((val) => !/<script.*?>.*?<\/script>/gi.test(val), {
        message: "Malicious content detected",
      }),
    password: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters long" })
      .nonempty({ message: "Password cannot be empty" }),
  }),
};

// <script>alert(1)</script>
// Este es un intento de XSS (Cross-site scripting).
// No afecta directamente el backend (a menos que guardes y luego muestres ese valor en HTML sin sanitizar).
// Pero igual debe ser rechazado o limpiado.
