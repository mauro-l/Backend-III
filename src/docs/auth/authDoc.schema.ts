export const authDocSchema = {
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
  },
};

export const authProperties = {
  first_name: { type: "string", example: "John" },
  last_name: { type: "string", example: "Doe" },
  email: { type: "string", example: "John.Doe@example.com" },
  role: { type: "string", example: "user" },
};

export const authResponse = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      format: "ObjectId",
      example: "681e64608c4d8b0f8ddd4ba8",
    },
    first_name: { type: "string", example: "John" },
    last_name: { type: "string", example: "Doe" },
    email: { type: "string", example: "John.Doe@example.com" },
    role: { type: "string", example: "user" },
  },
};
