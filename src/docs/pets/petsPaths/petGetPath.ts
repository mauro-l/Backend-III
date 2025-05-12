import {
  createResNotFound,
  responseSuccess,
} from "../../utils/responses.utils.ts";
import { petResSuccess } from "../petDoc.schema.ts";

export const petGetAllPath = {
  summary: "Get all pets",
  description: "Retrieve a list of all pets in the system.",
  tags: ["Pets"],
  responses: {
    200: responseSuccess("List of pets retrieved successfully", petResSuccess),
    404: createResNotFound("Pet not found", "No pets found"),
  },
};
