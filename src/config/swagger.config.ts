import { userDocSchema } from "../docs/users/userDoc.schema.ts";
import { userPath } from "../docs/users/user.path.ts";
import { authPath } from "../docs/auth/auth.path.ts";
import { authDocSchema } from "../docs/auth/authDoc.schema.ts";
import { petPath } from "../docs/pets/pets.path.ts";
import { petDocSchema } from "../docs/pets/petDoc.schema.ts";
import { adoptionPath } from "../docs/adoptions/adoption.path.ts";
import { adoptionDocSchema } from "../docs/adoptions/adoptionDoc.schema.ts";
import { limitsDocSchema } from "../docs/limits/limitsDoc.schema.ts";
import { limitsPath } from "../docs/limits/limits.path.ts";

export const swaggerOptions = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation Adoptation Pets",
    version: "1.2.0",
    description: `
        Adoptation Pets is a final project developed for the Advanced Backend course at CoderHouse. 
        This API allows animal shelters to efficiently manage pet adoptions.
        
        Main features:
        - User and pet registration.
        - List of adopted and available pets.
        - Registration of adopters and tracking of how many pets they have adopted.
        - **Rate limiting:** The API enforces a global daily request limit and a per-IP hourly limit to ensure fair usage and protect system stability. 
          Each request returns headers with your remaining daily quota. If you exceed the limits, you will receive a 429 error response.
        
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
    ...limitsPath,
  },
  components: {
    schemas: {
      User: userDocSchema,
      Auth: authDocSchema,
      Pets: petDocSchema,
      Adoption: adoptionDocSchema,
      Limits: limitsDocSchema,
    },
  },
};
