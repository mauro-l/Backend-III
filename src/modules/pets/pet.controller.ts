import type { NextFunction, Request, Response } from "express";
import { petService } from "./pet.service.ts";
import { BadRequestError } from "../../common/errors/errors.ts";

class PetController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { body } = req.body;
      const newPet = await petService.create(body);

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

  async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pet = await petService.getOne(req.query);
      res.status(200).json({ status: "ok", payload: pet });
    } catch (err) {
      next(err);
    }
  }
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { body } = req.body;
      if (!id) throw new BadRequestError("ID parameter is required");
      const petUpdate = await petService.update(id, body);
      res.status(200).json({ status: "ok", payload: petUpdate });
    } catch (err) {
      next(err);
    }
  }
  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) throw new BadRequestError("ID parameter is required");
      const response = await petService.remove(id);
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
