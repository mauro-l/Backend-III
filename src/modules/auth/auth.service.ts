import {
  ConflictError,
  UnauthorizedError,
} from "../../common/errors/errors.ts";
import {
  createHash,
  isValidPassword,
} from "../../common/utils/hashPassword.ts";
import { createToken } from "../../common/utils/jwt.ts";
import { userDao } from "../users/user.dao.ts";
import type { IUserSchema } from "../users/user.schema.ts";
import { userService } from "../users/user.service.ts";

class AuthService {
  async registerUser(user: IUserSchema) {
    const findUser = await userDao.getOne({ email: user.email });
    if (findUser) throw new ConflictError("User already exists");

    const newUserData = {
      ...user,
      password: createHash(user.password),
    };
    const newUser = await userDao.create(newUserData);
    return newUser;
  }

  async login(email: Partial<IUserSchema>, password: string) {
    const findUser = await userDao.getOne({ email });
    if (!findUser || !isValidPassword(findUser, password)) {
      throw new UnauthorizedError("Invalid email or password");
    }
    const token = createToken(findUser);

    return token;
  }
}

export const authService = new AuthService();
