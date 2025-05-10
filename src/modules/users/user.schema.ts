import { z } from "zod";

export const userSchema = {
  body: z.object({
    id: z
      .string()
      .regex(/^[a-fA-F0-9]{24}$/, {
        message: "ID must be a valid MongoDB ObjectId",
      })
      .optional(),
    first_name: z
      .string()
      .min(3, { message: "First name must be at least 3 characters long" })
      .max(20, { message: "First name must be at most 20 characters long" })
      .transform((val) => val.toLowerCase()),
    last_name: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters long" })
      .max(30, { message: "Last name must be at most 30 characters long" })
      .transform((val) => val.toLowerCase()),
    email: z
      .string()
      .email("Invalid email format")
      .transform((val) => val.toLowerCase()),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    role: z
      .enum(["user", "admin"])
      .transform((val) => val.toLowerCase())
      .optional(),
    pets: z
      .array(
        z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" })
      )
      .optional(),
  }),
};

export const userUpdateSchema = {
  params: z.object({
    id: z.string().regex(/^[a-fA-F0-9]{24}$/, {
      message: "ID must be a valid MongoDB ObjectId",
    }),
  }),
  body: z
    .object({
      id: z.string().optional(),
      first_name: z
        .string()
        .min(3, { message: "First name must be at least 3 characters long" })
        .max(20, { message: "First name must be at most 20 characters long" })
        .transform((val) => val.toLowerCase())
        .optional(),
      last_name: z
        .string()
        .min(3, { message: "Last name must be at least 3 characters long" })
        .max(30, { message: "Last name must be at most 30 characters long" })
        .transform((val) => val.toLowerCase())
        .optional(),
      email: z
        .string()
        .email("Invalid email format")
        .transform((val) => val.toLowerCase())
        .optional(),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .optional(),
      role: z
        .enum(["user", "admin"])
        .transform((val) => val.toLowerCase())
        .optional(),
      pets: z
        .array(
          z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" })
        )
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided for update",
    }),
  //Se utiliza .refine() para asegurarse de que el objeto body tenga al menos un campo presente.
  //La función (data) => Object.keys(data).length > 0 verifica que el objeto no esté vacío.
};

// Inferir el tipo completo del esquema
export type IUserSchema = z.infer<typeof userSchema.body>;
