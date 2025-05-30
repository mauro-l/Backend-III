import type { NextFunction, Request, Response } from "express";
import { petService } from "./pet.service.ts";
import { BadRequestError } from "../../common/errors/errors.ts";
import { Types } from "mongoose";

class PetController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newPet = await petService.create(req.body);

      res.status(201).json({ status: "ok", payload: newPet });
    } catch (err) {
      next(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pets = await petService.getAll();
      res.status(200).json({ status: "ok", payload: pets });
    } catch (err) {
      next(err);
    }
  }

  async getOneById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) throw new BadRequestError("ID parameter is required");
      const pet = await petService.getOneById(new Types.ObjectId(id));
      res.status(200).json({ status: "ok", payload: pet });
    } catch (err) {
      next(err);
    }
  }
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    if (!id) throw new BadRequestError("ID parameter is required");
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestError("Invalid ownerId format");
    try {
      const petUpdate = await petService.update(
        new Types.ObjectId(id),
        req.body
      );
      res.status(200).json({ status: "ok", payload: petUpdate });
    } catch (err) {
      next(err);
    }
  }
  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) throw new BadRequestError("ID parameter is required");
      const response = await petService.remove(new Types.ObjectId(id));
      res.status(200).json({ status: "ok", payload: response });
    } catch (err) {
      next(err);
    }
  }

  async createPetsMocks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { amount } = req.params;
      if (!amount) throw new BadRequestError("Amount parameter is required");

      const pets = await petService.createPetsMocks(Number(amount));

      res.status(201).json({ status: "ok", payload: pets });
    } catch (err) {
      next(err);
    }
  }
}

export const petController = new PetController();
