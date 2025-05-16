import bcrypt from "bcrypt";
import type { IUser } from "../../modules/users/user.interface.ts";

export const createHash = (password: string): string => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (user: IUser, password: string): boolean => {
  if (!user.password) {
    throw new Error("User password is not defined");
  }
  return bcrypt.compareSync(password, user.password);
};
