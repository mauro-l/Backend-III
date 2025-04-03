import type { FilterQuery } from "mongoose";
import {
  BadRequestError,
  DatabaseError,
  NotFoundError,
} from "../../common/errors/errors.ts";
import { petDao } from "./pet.dao.ts";
import type { IPetSchema } from "./pet.schema.ts";

class PetService {
  async create(data: IPetSchema): Promise<IPetSchema> {
    const newPet = await petDao.create(data);
    if (!newPet) throw new DatabaseError("Failed to create pet");
    return newPet;
  }

  async getAll(): Promise<IPetSchema[] | null> {
    const pets = await petDao.getAll();
    if (!pets) throw new NotFoundError("No pets found");
    return pets;
  }

  async getOne(query: FilterQuery<IPetSchema>): Promise<IPetSchema> {
    const pet = await petDao.getOne(query);
    if (!pet) throw new NotFoundError("Pet not found");
    return pet;
  }

  async update(
    id: string,
    data: Partial<IPetSchema>[]
  ): Promise<IPetSchema | null> {
    const pet = await petDao.getOne({ _id: id });
    if (!pet) throw new NotFoundError("Pet not found");

    const petUpdate = await petDao.update(id, data);
    if (!petUpdate) throw new DatabaseError("Failed to update pet");
    return petUpdate;
  }

  async remove(query: FilterQuery<IPetSchema>): Promise<string> {
    const pet = await petDao.getOne(query);
    if (!pet) throw new NotFoundError("Pet not found");

    if (!pet.id) throw new BadRequestError("Pet ID is missing");

    const petRemove = await petDao.remove(pet.id);
    if (!petRemove) throw new DatabaseError("Failed to remove pet");

    return "Pet successfully remove";
  }
}

export const petService = new PetService();

//FilterQuery
//permite tipar los criterios de búsqueda que se pasan a los métodos de Mongoose.
// Esto asegura que los filtros que uses sean válidos según el esquema del modelo.
