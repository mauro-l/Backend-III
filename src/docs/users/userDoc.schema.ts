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
    password: {
      type: "string",
      description: "Password of the user",
      example: "password123",
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
  id: { type: "string", format: "ObjectId" },
  first_name: { type: "string" },
  last_name: { type: "string" },
  email: { type: "string" },
  password: { type: "string" },
  role: { type: "string" },
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

export const userExample = {
  id: "67eef3bc235409c2e3ab7463",
  first_name: "John",
  last_name: "Doe",
  email: "johndoe@mail.com",
  password: "hashed_password",
  role: "user",
  pets: ["681e83dc14cf3fa665ab6f47", "681e83dc14cf3fa665ab6f47"],
};
