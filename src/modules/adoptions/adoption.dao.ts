import type { Types } from "mongoose";
import type { IAdoption } from "./adoption.interface.ts";
import { adoptionModel } from "./adoption.model.ts";

class AdoptionDao {
  async create(data: IAdoption): Promise<IAdoption | null> {
    const newAdoption = await adoptionModel.create(data);
    return newAdoption.toObject() as IAdoption;
    // El método toObject() convierte el documento de Mongoose en un objeto JavaScript plano.
    // También puedes usar .lean() en la consulta para obtener un objeto plano directamente. +info al final
  }

  async getAll() {
    return adoptionModel
      .find()
      .populate({
        path: "owner",
        select: "first_name last_name", // Solo incluir estos campos del owner
      })
      .populate({
        path: "pet",
        select: "name specie", // Solo incluir estos campos del pet
      })
      .lean();
  }

  async getOne(id: Types.ObjectId): Promise<IAdoption | null> {
    return await adoptionModel.findById(id);
  }

  async update(
    id: Types.ObjectId,
    data: Partial<IAdoption>
  ): Promise<IAdoption | null> {
    return await adoptionModel.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: Types.ObjectId) {
    return await adoptionModel.findByIdAndDelete(id);
  }
}

export const adoptionDao = new AdoptionDao();

/* 
Info para mi yo del futuro cuando lea esto:
El método .lean() de Mongoose se utiliza para devolver documentos como objetos JavaScript simples en lugar de instancias de Mongoose. 
Esto puede mejorar el rendimiento y reducir el uso de memoria, especialmente cuando no necesitas las funcionalidades adicionales que ofrece Mongoose.

El método .lean() solo se puede usar en consultas (find, findOne, etc.), pero no funciona con create, 
ya que create devuelve directamente un documento de Mongoose. 

Por lo tanto, en el caso de create, no puedes usar lean(). 
Si necesitas un objeto plano después de usar create, debes usar toObject().
*/
