import {
  createResNotFound,
  responseSuccess,
} from "../../utils/responses.utils.ts";
import { userResSuccess } from "../userDoc.schema.ts";

export const userGetAllPath = {
  summary: "Get all users",
  description: "Retrieve a list of all users in the system.",
  tags: ["Users"],
  responses: {
    200: responseSuccess(
      "List of users retrieved successfully",
      userResSuccess
    ),
    404: createResNotFound("User not found", "No users found"),
  },
};
