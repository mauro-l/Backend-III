import {
  createParameter,
  createResNotFound,
} from "../../utils/responses.utils.ts";

export const petDeletePath = {
  summary: "Delete pet by ID",
  description: "Delete a pet from the system by their ID.",
  tags: ["Pets"],
  parameters: [createParameter("pet", "id")],
  responses: {
    200: {
      description: "Pet deleted successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string", example: "ok" },
              payload: { type: "string", example: "Pet deleted" },
            },
          },
        },
      },
    },
    404: createResNotFound("Pet not found", "No pets found"),
  },
};
