import { z } from "zod";

export const userSchema = {
  body: z.object({
    id: z.string().optional(),
    first_name: z
      .string()
      .min(3, { message: "First name must be at least 3 characters long" })
      .max(20, { message: "First name must be at most 20 characters long" }),
    last_name: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters long" })
      .max(30, { message: "Last name must be at most 30 characters long" }),
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    role: z.enum(["user", "admin"]).optional(),
    pets: z
      .union([
        // Un único ID como string
        z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" }),
        // Un array de IDs como strings
        z.array(
          z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" })
        ),
        // Un array de objetos pet (cuando está populado)
        z.array(
          z.object({
            _id: z
              .string()
              .regex(/^[0-9a-fA-F]{24}$/)
              .optional(),
            // otros campos de tus mascotas si los necesitas validar
            name: z.string().optional(),
            specie: z.string().optional(),
            birthday: z.date().optional(),
            adopted: z.boolean().optional(),
            image: z.string().optional(),
            owner: z
              .string()
              .regex(/^[0-9a-fA-F]{24}$/)
              .optional(), // ID del dueño, si es necesario
          })
        ),
      ])
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
        .optional(),
      last_name: z
        .string()
        .min(3, { message: "Last name must be at least 3 characters long" })
        .max(30, { message: "Last name must be at most 30 characters long" })
        .optional(),
      email: z.string().email("Invalid email format").optional(),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .optional(),
      role: z.enum(["user", "admin"]).optional(),
      pets: z
        .union([
          // Un único ID como string
          z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" }),
          // Un array de IDs como strings
          z.array(
            z
              .string()
              .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" })
          ),
          // Un array de objetos pet (cuando está populado)
          z.array(
            z.object({
              _id: z
                .string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .optional(),
              // otros campos de tus mascotas si los necesitas validar
              name: z.string().optional(),
              specie: z.string().optional(),
              birthday: z.date().optional(),
              adopted: z.boolean().optional(),
              image: z.string().optional(),
              owner: z
                .string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .optional(), // ID del dueño, si es necesario
            })
          ),
        ])
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
