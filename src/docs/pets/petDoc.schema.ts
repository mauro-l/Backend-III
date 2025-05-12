export const petDocSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "ObjectId",
      description: "Unique identifier for the pet",
      example: "681e64608c4d8b0f8ddd4ba8",
    },
    name: {
      type: "string",
      description: "Name of the pet",
      example: "Fatiga",
      required: true,
    },
    specie: {
      type: "string",
      description: "Specie of the pet",
      example: "Perro",
      required: true,
    },
    birthdate: {
      type: "date",
      description: "Birthdate of the pet",
      example: "2024-08-20",
      required: true,
    },
    gender: {
      type: "string",
      description: "Gender of the pet",
      example: "Macho",
      required: true,
    },
    adopted: {
      type: "boolean",
      description: "Adoption status of the pet",
      example: "false",
      default: false,
    },
    image: {
      type: "string",
      description: "Image URL of the pet",
      example: "https://example.com/image.jpg",
      required: false,
    },
    owner: {
      type: "string",
      format: "ObjectId",
      description: "ID of the owner of the pet",
      example: "681e64608c4d8b0f8ddd4ba8",
      required: false,
    },
  },
};

export const petProperties = {
  name: { type: "string", example: "Fatiga" },
  specie: { type: "string", example: "Perro" },
  birthdate: { type: "date", example: "2024-08-20" },
  gender: { type: "string", example: "Macho" },
  adopted: {
    type: "boolean",
    example: "false",
  },
  image: {
    type: "string",
    example: "https://example.com/image.jpg",
  },
  owner: {
    type: "string",
    format: "ObjectId",
    example: "681e64608c4d8b0f8ddd4ba8",
  },
};

export const petResSuccess = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "ObjectId",
      example: "681e64608c4d8b0f8ddd4ba8",
    },
    name: { type: "string", example: "Fatiga" },
    specie: { type: "string", example: "Perro" },
    birthdate: { type: "date", example: "2024-08-20" },
    gender: { type: "string", example: "Macho" },
    adopted: {
      type: "boolean",
      example: "false",
    },
    image: {
      type: "string",
      example: "https://example.com/image.jpg",
    },
    owner: {
      type: "string",
      format: "ObjectId",
      example: "681e64608c4d8b0f8ddd4ba8",
    },
  },
};
