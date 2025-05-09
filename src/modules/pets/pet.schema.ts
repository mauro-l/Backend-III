import { z } from "zod";
import { Types } from "mongoose";

export const petsSchema = {
  body: z.object({
    id: z.string().optional(),
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(10, { message: "Name must be at most 10 characters long" })
      .transform((val) => val.toLowerCase()),
    specie: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters long" })
      .max(20, { message: "Last name must be at most 20 characters long" })
      .transform((val) => val.toLowerCase()),
    birthdate: z
      .string({ required_error: "Birthday is required" })
      .transform((val) => new Date(val))
      .refine((date) => !isNaN(date.getTime()), {
        message: "Birthday must be a valid date",
      })
      .refine((date) => date <= new Date(), {
        message: "Birthday must be in the past",
      }),
    gender: z
      .string()
      .transform((val) => val.toLowerCase())
      .refine((val) => ["macho", "hembra"].includes(val), {
        message: "Invalid enum value. Expected 'macho' | 'hembra'",
      }),
    adopted: z.boolean().optional(),
    image: z.string().optional(),
    owner: z
      .string()
      .refine((id) => Types.ObjectId.isValid(id), {
        message: "Owner must be a valid ObjectId",
      })
      .optional(),
  }),
};

export const petsUpdateSchema = {
  params: z.object({
    id: z.string().regex(/^[a-fA-F0-9]{24}$/, {
      message: "ID must be a valid MongoDB ObjectId",
    }),
  }),
  body: z
    .object({
      id: z.string().optional(),
      name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(10, { message: "Name must be at most 10 characters long" })
        .transform((val) => val.toLowerCase())

        .optional(),
      specie: z
        .string()
        .min(3, { message: "Last name must be at least 3 characters long" })
        .max(20, { message: "Last name must be at most 20 characters long" })
        .transform((val) => val.toLowerCase())

        .optional(),
      birthdate: z
        .string({ required_error: "Birthday is required" })
        .transform((val) => new Date(val))
        .refine((date) => !isNaN(date.getTime()), {
          message: "Birthday must be a valid date",
        })
        .refine((date) => date <= new Date(), {
          message: "Birthday must be in the past",
        })
        .optional(),
      adopted: z.boolean().optional(),
      gender: z
        .string()
        .transform((val) => val.toLowerCase())
        .refine((val) => ["macho", "hembra"].includes(val), {
          message: "Invalid enum value. Expected 'macho' | 'hembra'",
        }),
      image: z.string().optional(),
      owner: z
        .string()
        .refine((id) => Types.ObjectId.isValid(id), {
          message: "Owner must be a valid ObjectId",
        })
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided for update",
    }),
};

export type IPetSchema = z.infer<typeof petsSchema.body>;
