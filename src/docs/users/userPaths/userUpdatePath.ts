import {
  createResNotFound,
  parametersId,
  responseOk,
} from "../../utils/responses.utils.ts";
import {
  userDocSchema,
  userExample,
  userProperties,
} from "../userDoc.schema.ts";

export const userUpdatePath = {
  summary: "Update user by ID",
  description: "Update user information by their ID.",
  tags: ["Users"],
  parameters: parametersId,
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: userDocSchema,
      },
    },
  },
  responses: {
    200: {
      description: "User updated successfully",
      content: responseOk(userProperties, userExample),
    },
    404: createResNotFound("User not found", "No users found"),
  },
};
