export const createResNotFound = (description: string, message: string) => ({
  description: description,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          status: { type: "string", example: "error" },
          message: { type: "string", example: message },
        },
      },
    },
  },
});

export const responseOk = (propet: object, exam: object | string) => ({
  "application/json": {
    schema: {
      type: "object",
      properties: {
        status: { type: "string", example: "ok" },
        payload: {
          type: "object",
          properties: propet,
          example: exam,
        },
      },
    },
  },
});

export const parametersId = [
  {
    in: "path",
    name: "id",
    required: true,
    description: "ID of the user to retrieve",
    schema: {
      type: "string",
      format: "ObjectId",
      description: "Unique identifier for the user",
      example: "681e64608c4d8b0f8ddd4ba8",
    },
  },
];
