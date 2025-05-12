import { petCreatePath } from "./petsPaths/petCreatePath.ts";
import { petDeletePath } from "./petsPaths/petDeletePath.ts";
import { petGetByIdPath } from "./petsPaths/petGetByIdPath.ts";
import { petGetAllPath } from "./petsPaths/petGetPath.ts";
import { petMockPath } from "./petsPaths/petMocksPath.ts";
import { petUpdatePath } from "./petsPaths/petUpdatePath.ts";

export const petPath = {
  "/pets": {
    get: petGetAllPath,
    post: petCreatePath,
  },
  "/pets/{id}": {
    get: petGetByIdPath,
    put: petUpdatePath,
    delete: petDeletePath,
  },
  "/pets/mocks/{amount}": {
    get: petMockPath,
  },
};
