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

export const responseSuccess = (descrip: string, payload: object) => ({
  /* payload: {
    type: "object",
    properties: propet,
    example: exam,
  }, */
  description: descrip,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          status: { type: "string", example: "ok" },
          payload: payload,
        },
      },
    },
  },
});

/* {
  in: "path",
  name: "amount",
  required: true,
  description: "Number of mock users to create",
  schema: {
    type: "integer",
    example: 10,
  },
}, */
/* export const parametersId = [
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
]; */

export const createParameter = (name: "id" | "amount" = "id") => {
  const params = {
    id: {
      description: "ID of the user to retrieve",
      schema: {
        type: "string",
        format: "ObjectId",
        description: "Unique identifier for the user",
        example: "681e64608c4d8b0f8ddd4ba8",
      },
    },
    amount: {
      description: "Number of mock users to create",
      schema: {
        type: "integer",
        example: 10,
      },
    },
  };

  const parameters = {
    in: "path",
    name: name,
    required: true,
    description: params[name].description,
    schema: params[name].schema,
  };

  return parameters;
};
