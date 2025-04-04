import { z } from "zod";

export const amountParamsSchema = {
  params: z.object({
    amount: z.coerce
      .number({ invalid_type_error: "Amount must be a number" })
      .int("Amount must be an integer")
      .positive("Amount must be a positive number"),
  }),
};

export const idParamsSchema = {
  params: z.object({
    id: z
      .string()
      .regex(/^[a-fA-F0-9]{24}$/, {
        message: "ID must be a valid MongoDB ObjectId",
      }),
  }),
};
