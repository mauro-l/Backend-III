import { createResNotFound } from "../../utils/responses.utils.ts";
import { userExample, userProperties } from "../userDoc.schema.ts";

export const userGetAllPath = {
  summary: "Get all users",
  description: "Retrieve a list of all users in the system.",
  tags: ["Users"],
  responses: {
    200: {
      description: "List of users retrieved successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string", example: "ok" },
              payload: {
                type: "array",
                items: {
                  type: "object",
                  properties: userProperties,
                },
                example: [userExample, userExample],
              },
            },
          },
        },
      },
    },
    404: createResNotFound("User not found", "No users found"),
  },
};
