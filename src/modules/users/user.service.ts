import type { FilterQuery } from "mongoose";
import {
  BadRequestError,
  DatabaseError,
  NotFoundError,
} from "../../common/errors/errors.ts";
import { userDao } from "./user.dao.ts";
import type { IUserSchema } from "./user.schema.ts";

class UserService {
  async create(data: IUserSchema): Promise<IUserSchema> {
    const newUser = await userDao.create(data);
    if (!newUser) throw new DatabaseError("Failed to create user");
    return newUser;
  }

  async getAll(): Promise<IUserSchema[]> {
    const users = await userDao.getAll();
    if (!users) throw new NotFoundError("No users found");
    return users;
  }

  async getOne(query: FilterQuery<IUserSchema>): Promise<IUserSchema> {
    if ("password" in query) {
      throw new BadRequestError("Query cannot include the password field");
    }
    const user = await userDao.getOne(query);
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  async update(id: string, data: Partial<IUserSchema>[]): Promise<IUserSchema> {
    const user = await userDao.getOne({ _id: id });
    if (!user) throw new NotFoundError("No users found");

    const userUpdate = await userDao.update(id, data);
    if (!userUpdate) throw new DatabaseError("Failed to update user");
    return userUpdate;
  }

  async remove(id: string): Promise<string> {
    const user = await userDao.getOne({ _id: id });
    if (!user) throw new NotFoundError("No users found");

    const userDelete = await userDao.remove(id);
    if (!userDelete) throw new DatabaseError("Failed to delete user");
    return "User deleted";
  }
}

export const userService = new UserService();
