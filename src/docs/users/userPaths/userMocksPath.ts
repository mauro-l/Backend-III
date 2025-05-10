import { userExample, userProperties } from "../userDoc.schema.ts";

export const userMockPath = {
  summary: "Create mock users",
  description:
    "Create a specified number of mock users in the system. Useful for testing purposes.",
  operationId: "createMockUsers",
  tags: ["Users"],
  parameters: [
    {
      in: "path",
      name: "amount",
      required: true,
      description: "Number of mock users to create",
      schema: {
        type: "integer",
        example: 10,
      },
    },
  ],
  responses: {
    201: {
      description: "Mock of users created successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string", example: "ok" },
              payload: {
                type: "array",
                items: {
                  type: "object",
                  properties: userProperties,
                },
                example: [userExample, userExample],
              },
            },
          },
        },
      },
    },

    400: {
      description:
        "Bad request. The amount parameter must be a positive integer.",
      content: {
        "application/json": {
          schema: {
            type: "array",
            properties: {
              field: { type: "string", example: "params.amount" },
              message: { type: "string", example: "Invalid amount" },
            },
            example: [
              {
                field: "params.amount",
                message: "Invalid amount",
              },
            ],
          },
        },
      },
    },
  },
};
