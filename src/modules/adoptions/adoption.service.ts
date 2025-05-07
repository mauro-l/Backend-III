import { Types, type FilterQuery } from "mongoose";
import { NotFoundError } from "../../common/errors/errors.ts";
import { petDao } from "../pets/pet.dao.ts";
import { userDao } from "../users/user.dao.ts";
import { adoptionDao } from "./adoption.dao.ts";
import type { IAdoption } from "./adoption.interface.ts";

class AdoptionService {
  /* async getAllAdoptions(): Promise<IAdoption[] | null> {
    const adoptions = await adoptionDao.getAll().populate("owner pet").lean();
    return adoptions as IAdoption[];

   /*  return (await adoptionDao.getAll().populate("owner pet")) as IAdoption[]; 
  } */

  async getAllAdoptions(): Promise<IAdoption[] | null> {
    const adoptions = await adoptionDao.getAll();
    return adoptions as IAdoption[];
  }

  async getAdoption(query: FilterQuery<IAdoption>): Promise<IAdoption | null> {
    const adoption = await adoptionDao.getOne(query);
    if (!adoption) throw new NotFoundError("Adoption not found");
    return adoption;
  }

  async createAdoption(
    ownerId: Types.ObjectId,
    petId: Types.ObjectId
  ): Promise<IAdoption | null> {
    const pet = await petDao.getOne({ _id: petId });
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
}

export const adoptionService = new AdoptionService();
