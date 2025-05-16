import type { DeleteResult, FilterQuery, Types } from "mongoose";
import { userModel } from "./user.model.ts";
import type { IUser } from "./user.interface.ts";

class UserDao {
  async create(userData: IUser): Promise<IUser> {
    const newUser = await userModel.create(userData);
    return newUser.toObject() as IUser;
  }

  async getAll(): Promise<IUser[] | null> {
    return await userModel.find().select("-password");
  }

  async getOne(query: FilterQuery<IUser>): Promise<IUser | null> {
    return await userModel.findOne(query);
  }

  async update(
    id: Types.ObjectId,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    return await userModel
      .findByIdAndUpdate(id, data, { new: true })
      .select("-password");
  }

  async remove(id: Types.ObjectId): Promise<IUser | null> {
    return await userModel.findByIdAndDelete(id);
  }

  async removeAll(): Promise<DeleteResult> {
    return await userModel.deleteMany();
  }
}

export const userDao = new UserDao();
