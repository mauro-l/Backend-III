import {
  createResNotFound,
  responseSuccess,
} from "../../utils/responses.utils.ts";
import { petProperties, petResSuccess } from "../petDoc.schema.ts";

export const petCreatePath = {
  summary: "Create a new pet",
  description:
    "Create a new pet in the system. The pet will be added to the database.",
  tags: ["Pets"],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: petProperties,
        },
      },
    },
  },
  responses: {
    200: responseSuccess("Pet created successfully", petResSuccess),
    404: createResNotFound("Bad request", "Pet not found"),
  },
};
