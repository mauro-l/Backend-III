export const adoptionDocSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "ObjectId",
      description: "Unique identifier for the adoption",
      example: "681e64608c4d8b0f8ddd4ba8",
    },
    owner: {
      type: "object",
      description: "Populated owner details",
      properties: {
        id: {
          type: "string",
          format: "ObjectId",
          description: "Unique identifier for the owner",
          example: "681e64608c4d8b0f8ddd4ba8",
        },
        first_name: {
          type: "string",
          description: "First name of the owner",
          example: "John",
        },
        last_name: {
          type: "string",
          description: "Last name of the owner",
          example: "Doe",
        },
      },
    },
    pet: {
      type: "object",
      description: "Populated pet details",
      properties: {
        id: {
          type: "string",
          format: "ObjectId",
          description: "Unique identifier for the pet",
          example: "781e64608c4d8b0f8ddd4ba9",
        },
        name: {
          type: "string",
          description: "Name of the pet",
          example: "Felix",
        },
        specie: {
          type: "string",
          description: "Species of the pet",
          example: "Cat",
        },
      },
    },
  },
};

export const adoptionProperties = {
  owner: {
    type: "string",
    format: "ObjectId",
    description: "Unique identifier for the owner",
    example: "681e64608c4d8b0f8ddd4ba8",
    required: true,
  },
  pet: {
    type: "string",
    format: "ObjectId",
    description: "Unique identifier for the pet",
    example: "781e64608c4d8b0f8ddd4ba9",
    required: true,
  },
};

export const adoptionResponse = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "ObjectId",
      example: "681e64608c4d8b0f8ddd4ba8",
    },
    owner: {
      type: "object",
      description: "Populated owner details",
      properties: {
        id: {
          type: "string",
          format: "ObjectId",
          example: "681e64608c4d8b0f8ddd4ba8",
        },
        first_name: {
          type: "string",
          example: "John",
        },
        last_name: {
          type: "string",
          example: "Doe",
        },
      },
    },
    pet: {
      type: "object",
      description: "Populated pet details",
      properties: {
        id: {
          type: "string",
          format: "ObjectId",
          example: "781e64608c4d8b0f8ddd4ba9",
        },
        name: {
          type: "string",
          example: "Felix",
        },
        specie: {
          type: "string",
          example: "Cat",
        },
      },
    },
  },
};
