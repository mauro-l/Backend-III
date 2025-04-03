import { envsConfig } from "../../config/envs.config.ts";
import type { IUserSchema } from "../../modules/users/user.schema.ts";
import jwt from "jsonwebtoken";

export const createToken = (user: IUserSchema): string => {
  const { id, email } = user;
  const token = jwt.sign({ id, email }, envsConfig.JWT_SECRET, {
    expiresIn: "30m",
  });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, envsConfig.JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
};
