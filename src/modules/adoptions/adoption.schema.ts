import { z } from "zod";

export const adoptionSchema = {
  body: z.object({
    owner: z.string().regex(/^[a-fA-F0-9]{24}$/, {
      message: "ID must be a valid MongoDB ObjectId",
    }),
    pet: z.string().regex(/^[a-fA-F0-9]{24}$/, {
      message: "ID must be a valid MongoDB ObjectId",
    }),
  }),
};
