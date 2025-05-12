import {
  createParameter,
  createResNotFound,
} from "../../utils/responses.utils.ts";

export const adoptionDeletePath = {
  summary: "Delete adoption by ID",
  description: "Delete a adoption from the system by their ID.",
  tags: ["Adoptions"],
  parameters: [createParameter("adoption", "id")],
  responses: {
    200: {
      description: "Adoption deleted successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string", example: "ok" },
              payload: { type: "string", example: "Adoption deleted" },
            },
          },
        },
      },
    },
    404: createResNotFound("Adoption not found", "Adoption ID not found"),
  },
};
