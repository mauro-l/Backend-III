import bcrypt from "bcrypt";
import type { IUserSchema } from "../../modules/users/user.schema.ts";

export const createHash = (password: string): string => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (
  user: IUserSchema,
  password: string
): boolean => {
  return bcrypt.compareSync(password, user.password);
};
