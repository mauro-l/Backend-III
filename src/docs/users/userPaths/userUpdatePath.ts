import {
  createParameter,
  createResNotFound,
  responseSuccess,
} from "../../utils/responses.utils.ts";
import { userProperties, userResSuccess } from "../userDoc.schema.ts";

export const userUpdatePath = {
  summary: "Update user by ID",
  description: "Update user information by their ID.",
  tags: ["Users"],
  parameters: [createParameter("user", "id")],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: userProperties,
        },
      },
    },
  },
  responses: {
    200: responseSuccess("User updated successfully", userResSuccess),
    400: createResNotFound("Bad request", "Password cannot be updated"),
    404: createResNotFound("User not found", "No users found"),
  },
};
