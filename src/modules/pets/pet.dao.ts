import type { FilterQuery, Types } from "mongoose";
import { petModel } from "./pet.model.ts";
import type { DeleteResult } from "mongoose";
import type { IPet } from "./pet.interface.ts";

class PetDao {
  async create(data: IPet): Promise<IPet> {
    const newUser = await petModel.create(data);
    return newUser.toObject() as IPet;
  }

  async getAll(): Promise<IPet[] | null> {
    return await petModel.find();
  }

  async getOneById(id: Types.ObjectId): Promise<IPet | null> {
    return await petModel.findById(id);
  }

  async update(id: Types.ObjectId, data: Partial<IPet>): Promise<IPet | null> {
    return await petModel.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: Types.ObjectId): Promise<IPet | null> {
    return await petModel.findByIdAndDelete(id);
  }

  async removeMockAll(): Promise<DeleteResult> {
    return await petModel.deleteMany({});
  }
}

export const petDao = new PetDao();
