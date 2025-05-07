import type { NextFunction, Request, Response } from "express";
import { adoptionService } from "./adoption.service.ts";
import { Types } from "mongoose";
import { BadRequestError } from "../../common/errors/errors.ts";

class AdoptionController {
  async getAllAdoptions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const adoptions = await adoptionService.getAllAdoptions();
      res.status(200).json({ status: "ok", payload: adoptions });
    } catch (err) {
      next(err);
    }
  }

  async getAdoptions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Obtener los filtros desde req.query
      const filters = req.query;

      // Validar que al menos un filtro esté presente
      if (!filters || Object.keys(filters).length === 0) {
        throw new BadRequestError("At least one filter parameter is required");
      }

      // Si algún filtro es un ObjectId, validarlo y convertirlo
      const query: Record<string, any> = {};
      for (const [key, value] of Object.entries(filters)) {
        if (Types.ObjectId.isValid(value as string)) {
          query[key] = new Types.ObjectId(value as string);
        } else {
          query[key] = value;
        }
      }
      const adoption = await adoptionService.getAdoption(query);

      res.status(200).json({ status: "ok", payload: adoption });
    } catch (err) {
      next(err);
    }
  }

  async createAdoption(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { owner, pet } = req.body;
      if (!Types.ObjectId.isValid(owner))
        throw new BadRequestError("Invalid ownerId format");

      if (!Types.ObjectId.isValid(pet))
        throw new BadRequestError("Invalid petId format");
      const adoption = await adoptionService.createAdoption(owner, pet);
      res.status(201).json({ status: "ok", payload: adoption });
    } catch (err) {
      next(err);
    }
  }
}

export const adoptionController = new AdoptionController();
