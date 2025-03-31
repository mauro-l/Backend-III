import type { FilterQuery } from "mongoose";
import { userModel } from "./user.model.ts";
import type { IUserSchema } from "./user.schema.ts";

class UserDao {
  async getAll(): Promise<IUserSchema[] | null> {
    return await userModel.find();
  }

  async getOne(query: FilterQuery<IUserSchema>): Promise<IUserSchema | null> {
    return await userModel.findOne(query);
  }

  async update(
    id: string,
    data: Partial<IUserSchema>[]
  ): Promise<IUserSchema | null> {
    return await userModel.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: string): Promise<IUserSchema | null> {
    return await userModel.findByIdAndDelete(id);
  }
}

export const userDao = new UserDao();
