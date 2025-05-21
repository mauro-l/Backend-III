import {
  createResNotFound,
  responseSuccess,
} from "../utils/responses.utils.ts";
import { limitsResSuccess } from "./limitsDoc.schema.ts";

export const limitsPath = {
  "/limits/status": {
    get: {
      summary: "Gets the current status of query limits",
      description:
        "This endpoint returns the current usage and remaining limits for user queries. Useful for monitoring and managing API consumption.",
      tags: ["Limits"],
      responses: {
        201: responseSuccess("User register successfully", limitsResSuccess),
        404: createResNotFound("Bad request", "User already exists"),
      },
    },
  },
};
