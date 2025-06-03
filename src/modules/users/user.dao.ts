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
    const user = await userModel.findOne(query).lean();
    if (!user) return null;
    return {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      role: user.role === "admin" ? "admin" : "user",
      pets: user.pets ?? [],
    };
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
