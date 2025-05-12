import { userDocSchema } from "../docs/users/userDoc.schema.ts";
import { userPath } from "../docs/users/user.path.ts";
import { authPath } from "../docs/auth/auth.path.ts";
import { authDocSchema } from "../docs/auth/authDoc.schema.ts";
import { petPath } from "../docs/pets/pets.path.ts";
import { petDocSchema } from "../docs/pets/petDoc.schema.ts";
import { adoptionPath } from "../docs/adoptions/adoption.path.ts";
import { adoptionDocSchema } from "../docs/adoptions/adoptionDoc.schema.ts";

export const swaggerOptions = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation Adoptation Pets",
    version: "1.1.5",
    description: `
        Adoptation Pets is a final project developed for the Advanced Backend course at CoderHouse. 
        This API allows animal shelters to efficiently manage pet adoptions.
        
        Main features:
        - User and pet registration.
        - List of adopted and available pets.
        - Registration of adopters and tracking of how many pets they have adopted.
        
        Key technologies:
        - Backend built with Node.js, Express, and Bun.
        - Robust validations using Zod.
        - Data persistence with MongoDB.
        
        This interactive documentation allows you to explore and test the API endpoints easily.
      `,
  },
  servers: [
    {
      url: "http://localhost:8080/api",
      description: "Development server",
    },
  ],
  paths: {
    ...userPath,
    ...authPath,
    ...petPath,
    ...adoptionPath,
  },
  components: {
    schemas: {
      User: userDocSchema,
      Auth: authDocSchema,
      Pets: petDocSchema,
      Adoption: adoptionDocSchema,
    },
  },
};
