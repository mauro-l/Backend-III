import { adoptionCreatePath } from "./adoptionsPaths.ts/createAdoptions.ts";
import { adoptionDeletePath } from "./adoptionsPaths.ts/deleteAdoption.ts";
import { adoptionGetAllPath } from "./adoptionsPaths.ts/getAllAdoption.ts";
import { adoptionGetByIdPath } from "./adoptionsPaths.ts/getByIdAdoption.ts";

export const adoptionPath = {
  "/adoption": {
    get: adoptionGetAllPath,
    post: adoptionCreatePath,
  },
  "/adoption/{id}": {
    get: adoptionGetByIdPath,
    delete: adoptionDeletePath,
  },
};
