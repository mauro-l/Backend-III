import {
  createResNotFound,
  parametersId,
} from "../../utils/responses.utils.ts";

export const userDeletePath = {
  summary: "Delete user by ID",
  description: "Delete a user from the system by their ID.",
  tags: ["Users"],
  parameters: parametersId,
  responses: {
    200: {
      description: "User deleted successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string", example: "ok" },
              payload: "User deleted",
            },
          },
        },
      },
    },
    404: createResNotFound("User not found", "No users found"),
  },
};
