import {
  createParameter,
  responseSuccess,
} from "../../utils/responses.utils.ts";
import { userResSuccess } from "../userDoc.schema.ts";

export const userMockPath = {
  summary: "Create mock users",
  description:
    "Create a specified number of mock users in the system. Useful for testing purposes.",
  operationId: "createMockUsers",
  tags: ["Users"],
  parameters: [createParameter("amount")],
  responses: {
    201: responseSuccess("Mock of users created successfully", userResSuccess),
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
