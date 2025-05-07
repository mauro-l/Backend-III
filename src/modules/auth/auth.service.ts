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
import type { IUser } from "../users/user.interface.ts";

class AuthService {
  async registerUser(user: IUser) {
    const findUser = await userDao.getOne({ email: user.email });
    if (findUser) throw new ConflictError("User already exists");

    const newUserData = {
      ...user,
      password: createHash(user.password),
    };
    try {
      const newUser = await userDao.create(newUserData);
      return newUser;
    } catch (err) {
      throw new Error(`Error creating user`);
    }
  }

  async login(email: Partial<IUser>, password: string) {
    const findUser = await userDao.getOne({ email });
    if (!findUser || !isValidPassword(findUser, password)) {
      throw new UnauthorizedError("Invalid email or password");
    }
    const token = createToken(findUser);

    return token;
  }
}

export const authService = new AuthService();
