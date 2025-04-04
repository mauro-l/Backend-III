import type { FilterQuery } from "mongoose";
import { petModel } from "./pet.model.ts";
import type { DeleteResult } from "mongoose";
import type { IPetSchema } from "./pet.schema.ts";

class PetDao {
  async create(data: IPetSchema): Promise<IPetSchema> {
    const newUser = await petModel.create(data);
    return newUser.toObject() as IPetSchema;
  }

  async getAll(): Promise<IPetSchema[] | null> {
    return await petModel.find();
  }

  async getOne(query: FilterQuery<IPetSchema>): Promise<IPetSchema | null> {
    return await petModel.findOne(query);
  }

  async update(
    id: string,
    data: Partial<IPetSchema>[]
  ): Promise<IPetSchema | null> {
    return await petModel.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: string): Promise<IPetSchema | null> {
    return await petModel.findByIdAndDelete(id);
  }

  async removeMockAll(): Promise<DeleteResult> {
    return await petModel.deleteMany({});
  }
}

export const petDao = new PetDao();
