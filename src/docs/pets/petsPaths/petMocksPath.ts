import {
  createParameter,
  responseSuccess,
} from "../../utils/responses.utils.ts";
import { petResSuccess } from "../petDoc.schema.ts";

export const petMockPath = {
  summary: "Create mock pets",
  description:
    "Create a specified number of mock pets in the system. Useful for testing purposes.",
  operationId: "createMockPets",
  tags: ["Pets"],
  parameters: [createParameter("pet", "amount")],
  responses: {
    201: responseSuccess("Mock of pets created successfully", petResSuccess),
    400: {
      description:
        "Bad request. The amount parameter must be a positive integer.",
      content: {
        "application/json": {
          schema: {
            type: "array",
            properties: {
              field: { type: "string", example: "params.amount" },
              message: { type: "string", example: "Invalid amount" },
            },
            example: [
              {
                field: "params.amount",
                message: "Invalid amount",
              },
            ],
          },
        },
      },
    },
  },
};
