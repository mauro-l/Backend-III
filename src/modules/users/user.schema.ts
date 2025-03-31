import { z } from "zod";

export const userMockSchema = {
  body: z.object({
    id: z.string().optional(),
    first_name: z
      .string()
      .min(3, { message: "First name must be at least 3 characters long" })
      .max(10, { message: "First name must be at most 10 characters long" }),
    last_name: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters long" })
      .max(10, { message: "Last name must be at most 10 characters long" }),
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    role: z.enum(["user", "admin"]).optional(),
  }),
};

// Inferir el tipo completo del esquema
export type IUserSchema = z.infer<typeof userMockSchema.body>;
