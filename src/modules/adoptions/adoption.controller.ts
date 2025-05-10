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

  async getAdoption(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) throw new BadRequestError("ID parameter is required");

      const adoption = await adoptionService.getAdoption(
        new Types.ObjectId(id)
      );

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
      const adoption = await adoptionService.createAdoption(owner, pet);
      res.status(201).json({ status: "ok", payload: adoption });
    } catch (err) {
      next(err);
    }
  }

  async removeAdoption(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) throw new BadRequestError("ID parameter is required");

      const response = await adoptionService.removeAdoption(
        new Types.ObjectId(id)
      );
      res.status(200).json({ status: "ok", payload: response });
    } catch (err) {
      next(err);
    }
  }
}

export const adoptionController = new AdoptionController();
