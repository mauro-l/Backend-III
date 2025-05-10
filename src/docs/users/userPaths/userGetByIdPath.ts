import {
  createResNotFound,
  parametersId,
  responseOk,
} from "../../utils/responses.utils.ts";
import { userExample, userProperties } from "../userDoc.schema.ts";

export const userGetByIdPath = {
  summary: "Get user by ID",
  description: "Retrieve a user from the system by their ID.",
  operationId: "getUserById",
  tags: ["Users"],
  parameters: parametersId,
  responses: {
    200: {
      description: "User found",
      content: responseOk(userProperties, userExample),
    },
    404: createResNotFound("User not found", "No users found"),
  },
};
