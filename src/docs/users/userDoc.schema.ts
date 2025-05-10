export const userDocSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "ObjectId",
      description: "Unique identifier for the user",
      example: "681e64608c4d8b0f8ddd4ba8",
    },
    first_name: {
      type: "string",
      description: "First name of the user",
      example: "John",
    },
    last_name: {
      type: "string",
      description: "Last name of the user",
      example: "Doe",
    },
    email: {
      type: "string",
      description: "Email address of the user",
      example: "John.Doe@example.com",
    },
    role: {
      type: "string",
      description: "Role of the user (optional, default is 'user')",
      example: "user",
    },
    pets: {
      type: "array",
      description:
        "Array of pet IDs associated with the user (optional, default is empty)",
      example: ["681e64608c4d8b0f8ddd4ba8", "681e64608c4d8b0f8ddd4ba9"],
      items: {
        type: "string",
        format: "ObjectId",
        example: ["681e64608c4d8b0f8ddd4ba8", "681e64608c4d8b0f8ddd4ba9"],
      },
    },
  },
};

export const userProperties = {
  first_name: { type: "string", example: "steve" },
  last_name: { type: "string", example: "dew" },
  email: { type: "string", example: "steve@example.com" },
  role: { type: "string", example: "user" },
  pets: {
    type: "array",
    description: "Array of pet IDs associated with the user",
    items: {
      type: "string",
      format: "ObjectId",
      example: ["681e64608c4d8b0f8ddd4ba8", "681e64608c4d8b0f8ddd4ba9"],
    },
  },
};

export const userResSuccess = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "ObjectId",
      example: "681e64608c4d8b0f8ddd4ba8",
    },
    first_name: { type: "string", example: "steve" },
    last_name: { type: "string", example: "dew" },
    email: { type: "string", example: "steve@example.com" },
    role: { type: "string", example: "user" },
    pets: {
      type: "array",
      example: ["681e64608c4d8b0f8ddd4ba8", "681e64608c4d8b0f8ddd4ba9"],
    },
  },
};
