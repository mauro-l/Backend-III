import {
  createResNotFound,
  responseSuccess,
} from "../../utils/responses.utils.ts";
import { adoptionProperties, adoptionResponse } from "../adoptionDoc.schema.ts";

export const adoptionCreatePath = {
  summary: "Create a new adoption",
  description:
    "Create a new adoption in the system. The adoption will be added to the database.",
  tags: ["Adoptions"],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: adoptionProperties,
        },
      },
    },
  },
  responses: {
    200: responseSuccess("Adoption created successfully", adoptionResponse),
    404: createResNotFound("Bad request", "Adoption not found"),
  },
};
