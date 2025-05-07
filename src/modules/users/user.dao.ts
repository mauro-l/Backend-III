import type { DeleteResult, FilterQuery, Types } from "mongoose";
import { userModel } from "./user.model.ts";
import type { IUser } from "./user.interface.ts";

class UserDao {
  async create(userData: IUser): Promise<IUser> {
    const newUser = await userModel.create(userData);
    return newUser.toObject() as IUser;
  }

  async getAll(): Promise<IUser[] | null> {
    return await userModel.find();
  }

  async getOne(query: FilterQuery<IUser>): Promise<IUser | null> {
    return await userModel.findOne(query);
  }

  async update(
    id: Types.ObjectId,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    return await userModel.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: string): Promise<IUser | null> {
    return await userModel.findByIdAndDelete(id);
  }

  async removeMockAll(): Promise<DeleteResult> {
    return await userModel.deleteMany();
  }
}

export const userDao = new UserDao();
