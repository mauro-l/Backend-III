import {
  createParameter,
  createResNotFound,
  responseSuccess,
} from "../../utils/responses.utils.ts";
import { adoptionResponse } from "../adoptionDoc.schema.ts";

export const adoptionGetByIdPath = {
  summary: "Get adoption by ID",
  description: "Retrieve a adoption from the system by their ID.",
  operationId: "getAdoptionById",
  tags: ["Adoptions"],
  parameters: [createParameter("adoption", "id")],
  responses: {
    200: responseSuccess("Adoption found", adoptionResponse),
    404: createResNotFound("Adoption not found", "No adoptions found"),
  },
};
