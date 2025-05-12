import {
  createParameter,
  createResNotFound,
  responseSuccess,
} from "../../utils/responses.utils.ts";
import { petResSuccess } from "../petDoc.schema.ts";

export const petGetByIdPath = {
  summary: "Get pet by ID",
  description: "Retrieve a pet from the system by their ID.",
  operationId: "getPetById",
  tags: ["Pets"],
  parameters: [createParameter("pet", "id")],
  responses: {
    200: responseSuccess("Pet found", petResSuccess),
    404: createResNotFound("Pet not found", "No pets found"),
  },
};
