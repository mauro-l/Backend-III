import { envsConfig } from "../../config/envs.config.ts";
import type { IUser } from "../../modules/users/user.interface.ts";
import jwt from "jsonwebtoken";

export const createToken = (user: IUser): string => {
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
    if (err instanceof jwt.TokenExpiredError) {
      throw new Error("Token has expired");
    } else if (err instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    } else {
      throw new Error("Token verification failed");
    }
  }
};
