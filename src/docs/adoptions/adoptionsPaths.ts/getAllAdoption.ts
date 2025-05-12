import {
  createResNotFound,
  responseSuccess,
} from "../../utils/responses.utils.ts";
import { adoptionResponse } from "../adoptionDoc.schema.ts";

export const adoptionGetAllPath = {
  summary: "Get all adoptions",
  description: "Retrieve a list of all adoptions in the system.",
  tags: ["Adoptions"],
  responses: {
    200: responseSuccess(
      "List of adoptions retrieved successfully",
      adoptionResponse
    ),
    404: createResNotFound("Adoption not found", "No adoptions found"),
  },
};
