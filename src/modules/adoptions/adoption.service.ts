import { Types } from "mongoose";
import { NotFoundError } from "../../common/errors/errors.ts";
import { petDao } from "../pets/pet.dao.ts";
import { userDao } from "../users/user.dao.ts";
import { adoptionDao } from "./adoption.dao.ts";
import type { IAdoption } from "./adoption.interface.ts";

class AdoptionService {
  async getAllAdoptions(): Promise<IAdoption[] | null> {
    const adoptions = await adoptionDao.getAll();
    return adoptions as IAdoption[];
  }

  async getAdoption(id: Types.ObjectId): Promise<IAdoption | null> {
    const adoption = await adoptionDao.getOne(id);
    if (!adoption) throw new NotFoundError("Adoption not found");
    return {
      ...adoption,
      owner: adoption.owner || new Types.ObjectId(),
      pet: adoption.pet || new Types.ObjectId(),
    } as IAdoption;
  }

  async createAdoption(
    ownerId: Types.ObjectId,
    petId: Types.ObjectId
  ): Promise<IAdoption | null> {
    const pet = await petDao.getOneById(petId);
    if (!pet) throw new NotFoundError("Pet not found");
    if (pet.adopted) throw new NotFoundError("Pet already adopted");

    const user = await userDao.getOne({ _id: ownerId });
    if (!user || !user.id) throw new NotFoundError("User not found");

    const adoption = await adoptionDao.create({
      owner: new Types.ObjectId(ownerId),
      pet: new Types.ObjectId(petId),
    });

    await petDao.update(petId, { adopted: true, owner: ownerId });

    const updatePets = [...(user.pets || []), petId];
    await userDao.update(user.id, { pets: updatePets });

    return adoption;
  }

  async removeAdoption(id: Types.ObjectId): Promise<string | null> {
    const adoption = await adoptionDao.getOne(id);
    if (!adoption) throw new NotFoundError("Adoption not found");

    const petId = adoption.pet;
    if (!petId) throw new NotFoundError("Adoption pet ID not found");
    const pet = await petDao.getOneById(petId);
    if (!pet) throw new NotFoundError("Pet not found");

    await petDao.update(petId, { adopted: false, owner: null });
    const user = await userDao.getOne({ _id: adoption.owner });
    if (user && user.id) {
      const updatePets = user.pets?.filter(
        (petId) => petId.toString() !== petId.toString()
      );
      await userDao.update(user.id, { pets: updatePets });
    }
    const adoptionRemove = await adoptionDao.remove(id);
    if (!adoptionRemove) throw new NotFoundError("Adoption not found");

    return "Adoption deleted successfully";
  }
}

export const adoptionService = new AdoptionService();
