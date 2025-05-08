import { Types } from "mongoose";
import { DatabaseError, NotFoundError } from "../../common/errors/errors.ts";
import { userDao } from "./user.dao.ts";
import { generateUserMock } from "../../mock/user.mock.ts";
import type { IUser } from "./user.interface.ts";

class UserService {
  async create(data: IUser): Promise<IUser> {
    const newUser = await userDao.create(data);
    if (!newUser) throw new DatabaseError("Failed to create user");
    return newUser;
  }

  async getAll(): Promise<IUser[]> {
    const users = await userDao.getAll();
    if (!users) throw new NotFoundError("No users found");
    return users;
  }

  async getOne(id: Types.ObjectId): Promise<IUser> {
    const user = await userDao.getOne(id);
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  async update(id: Types.ObjectId, data: Partial<IUser>): Promise<IUser> {
    const user = await userDao.getOne(id);
    if (!user) throw new NotFoundError("No users found");

    const userUpdate = await userDao.update(id, data);
    if (!userUpdate) throw new DatabaseError("Failed to update user");
    return userUpdate;
  }

  async remove(id: Types.ObjectId): Promise<string> {
    const user = await userDao.getOne(id);
    if (!user) throw new NotFoundError("No users found");

    const userDelete = await userDao.remove(id);
    if (!userDelete) throw new DatabaseError("Failed to delete user");
    return "User deleted";
  }

  async removeAll(): Promise<string> {
    const userDelete = await userDao.removeAll();
    if (!userDelete) throw new DatabaseError("Failed to delete");
    return "Users deleted";
  }

  async createUserMocks(amount: number): Promise<IUser[]> {
    await userDao.removeAll();
    const users = generateUserMock(amount);
    const createdUsers: IUser[] = [];

    for (const user of users) {
      const newUser = await userDao.create(user);
      createdUsers.push(newUser);
    }

    return createdUsers;
  }
}

export const userService = new UserService();
