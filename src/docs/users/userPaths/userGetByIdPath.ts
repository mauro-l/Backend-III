import {
  createParameter,
  createResNotFound,
  responseSuccess,
} from "../../utils/responses.utils.ts";
import { userResSuccess } from "../userDoc.schema.ts";

export const userGetByIdPath = {
  summary: "Get user by ID",
  description: "Retrieve a user from the system by their ID.",
  operationId: "getUserById",
  tags: ["Users"],
  parameters: [createParameter()],
  responses: {
    200: responseSuccess("User found", userResSuccess),
    404: createResNotFound("User not found", "No users found"),
  },
};
