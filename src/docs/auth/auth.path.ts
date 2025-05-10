import {
  createResNotFound,
  responseSuccess,
} from "../utils/responses.utils.ts";
import { authProperties, authResponse } from "./authDoc.schema.ts";

export const authPath = {
  "/auth/register": {
    post: {
      summary: "Register a new user",
      description:
        "Register a new user in the system. Validation thath the user does not exist.",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: authProperties,
            },
          },
        },
      },
      responses: {
        201: responseSuccess("User register successfully", authResponse),
        404: createResNotFound("Bad request", "User already exists"),
      },
    },
  },
  "/auth/login": {
    post: {
      summary: "Login user",
      description:
        "Login user in the system. Validation thath the user does not exist.",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  example: "joe_doe@example.com",
                },
                password: {
                  type: "string",
                  format: "password",
                  example: "password123",
                },
              },
            },
          },
        },
      },
      responses: {
        200: responseSuccess("User login successfully", {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "joedoe@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "password123",
            },
          },
        }),
        404: createResNotFound("Bad request", "User not found"),
      },
    },
  },
};
