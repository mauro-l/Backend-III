import type { FilterQuery, Types } from "mongoose";
import {
  BadRequestError,
  DatabaseError,
  NotFoundError,
} from "../../common/errors/errors.ts";
import { petDao } from "./pet.dao.ts";
import type { IPetSchema } from "./pet.schema.ts";
import { generatePetsMock } from "../../mock/pets.mock.ts";
import type { IPet } from "./pet.interface.ts";

class PetService {
  async create(data: IPet): Promise<IPet> {
    const newPet = await petDao.create(data);
    if (!newPet) throw new DatabaseError("Failed to create pet");
    return newPet;
  }

  async getAll(): Promise<IPet[] | null> {
    const pets = await petDao.getAll();
    if (!pets) throw new NotFoundError("No pets found");
    return pets;
  }

  async getOne(query: FilterQuery<IPet>): Promise<IPet> {
    const pet = await petDao.getOne(query);
    if (!pet) throw new NotFoundError("Pet not found");
    return pet;
  }

  async update(id: Types.ObjectId, data: Partial<IPet>): Promise<IPet | null> {
    const pet = await petDao.getOne({ _id: id });
    if (!pet) throw new NotFoundError("Pet not found");

    const petUpdate = await petDao.update(id, data);
    if (!petUpdate) throw new DatabaseError("Failed to update pet");
    return petUpdate;
  }

  async remove(id: string): Promise<string> {
    const pet = await petDao.getOne({ _id: id });
    if (!pet) throw new NotFoundError("Pet not found");

    const petRemove = await petDao.remove(id);
    if (!petRemove) throw new DatabaseError("Failed to remove pet");

    return "Pet successfully remove";
  }

  async removeMockAll() {
    const pets = await petDao.removeMockAll();
    if (!pets) throw new DatabaseError("Failed to remove pets mock");
    return pets;
  }

  async createPetsMocks(amount: number): Promise<IPet[] | null> {
    await petDao.removeMockAll();
    const pets = generatePetsMock(amount);
    const createdPets: IPet[] = [];

    for (const pet of pets) {
      const newPet = await petDao.create(pet);
      createdPets.push(newPet);
    }

    return createdPets;
  }
}

export const petService = new PetService();

//FilterQuery
//permite tipar los criterios de búsqueda que se pasan a los métodos de Mongoose.
// Esto asegura que los filtros que uses sean válidos según el esquema del modelo.
