import type { Types } from "mongoose";
import {
  BadRequestError,
  ConflictError,
  DatabaseError,
  NotFoundError,
} from "../../common/errors/errors.ts";
import { petDao } from "./pet.dao.ts";
import { generatePetsMock } from "../../mock/pets.mock.ts";
import type { IPet } from "./pet.interface.ts";
import { logger } from "../../common/utils/loggers.ts";

class PetService {
  async create(data: IPet): Promise<IPet> {
    const existingPet = await petDao.getOne({
      name: data.name,
      birthdate: data.birthdate,
      gender: data.gender,
    });
    console.log(
      "Pet",
      data,
      "birthdate",
      typeof data.birthdate,
      data.birthdate
    );
    console.log("existingPet", existingPet);
    if (existingPet)
      throw new ConflictError(
        "Pet with the same name, birthdate, and gender already exists"
      );

    const newPet = await petDao.create(data);
    if (!newPet) throw new DatabaseError("Failed to create pet");
    return newPet;
  }

  async getAll(): Promise<IPet[] | null> {
    const pets = await petDao.getAll();
    if (!pets) throw new NotFoundError("No pets found");
    return pets;
  }

  async getOneById(id: Types.ObjectId): Promise<IPet> {
    const pet = await petDao.getOneById(id);
    if (!pet) throw new NotFoundError("Pet not found");
    return pet;
  }

  async update(id: Types.ObjectId, data: Partial<IPet>): Promise<IPet | null> {
    const pet = await petDao.getOneById(id);
    if (!pet) throw new NotFoundError("Pet not found");

    const petUpdate = await petDao.update(id, data);
    if (!petUpdate) throw new DatabaseError("Failed to update pet");
    return petUpdate;
  }

  async remove(id: Types.ObjectId): Promise<string> {
    const pet = await petDao.getOneById(id);
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
