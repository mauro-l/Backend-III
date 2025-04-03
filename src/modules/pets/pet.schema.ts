import { z } from "zod";

export const petsSchema = {
  body: z.object({
    id: z.string().optional(),
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(10, { message: "Name must be at most 10 characters long" }),
    specie: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters long" })
      .max(20, { message: "Last name must be at most 20 characters long" }),
    birthday: z
      .date({
        required_error: "Birthday is required",
      })
      .refine((date) => date <= new Date(), {
        message: "Birthday must be in the past",
      }),
    adopted: z.boolean().optional(),
    image: z.string().optional(),
    owner: z.string().optional(),
  }),
};

export type IPetSchema = z.infer<typeof petsSchema.body>;
