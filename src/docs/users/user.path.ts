import { userGetAllPath } from "./userPaths/userGetPath.ts";
import { userGetByIdPath } from "./userPaths/userGetByIdPath.ts";
import { userUpdatePath } from "./userPaths/userUpdatePath.ts";
import { userDeletePath } from "./userPaths/userDeletePath.ts";
import { userMockPath } from "./userPaths/userMocksPath.ts";

export const userPath = {
  "/user": {
    get: userGetAllPath,
  },
  "/user/:id": {
    get: userGetByIdPath,
    put: userUpdatePath,
    delete: userDeletePath,
  },
  "/user/mocks/:amount": {
    get: userMockPath,
  },
};
