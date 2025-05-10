import { userGetAllPath } from "./userPaths/userGetPath.ts";
import { userGetByIdPath } from "./userPaths/userGetByIdPath.ts";
import { userUpdatePath } from "./userPaths/userUpdatePath.ts";
import { userDeletePath } from "./userPaths/userDeletePath.ts";
import { userMockPath } from "./userPaths/userMocksPath.ts";

export const userPath = {
  "/user": {
    get: userGetAllPath,
    /* post: {
      summary: "Create a new user",
      description:
        "Create a new user in the system. Validation thath the user does not exist.",
      tags: ["Users"],
      requestBody: {
        required: true,

      },
      responses: {
        201: {
          description: "User created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string", example: "ok" },
                  payload: { type: "object" },
                },
              },
            },
          },
        },
        400: {
          description: "Bad request",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string", example: "error" },
                  message: { type: "string", example: "User already exists" },
                },
              },
            },
          },
        },
      },
    }, */
  },
  "/user/:id": {
    get: userGetByIdPath,
    put: userUpdatePath,
    delete: userDeletePath,
  },
  "/user/mocks/:amount": {
    get: userMockPath,
  },
};
