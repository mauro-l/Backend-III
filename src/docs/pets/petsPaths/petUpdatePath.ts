import {
  createParameter,
  createResNotFound,
  responseSuccess,
} from "../../utils/responses.utils.ts";
import { petProperties, petResSuccess } from "../petDoc.schema.ts";

export const petUpdatePath = {
  summary: "Update pet by ID",
  description: "Update pet information by their ID.",
  tags: ["Pets"],
  parameters: [createParameter("pet", "id")],
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
    200: responseSuccess("Pet updated successfully", petResSuccess),
    400: createResNotFound("Bad request", "Password cannot be updated"),
    404: createResNotFound("Pet not found", "No pets found"),
  },
};
