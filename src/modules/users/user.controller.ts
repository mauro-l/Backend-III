import type { NextFunction, Request, Response } from "express";
import { userService } from "./user.service.ts";
import { BadRequestError } from "../../common/errors/errors.ts";
import { generateUserMock } from "../../mock/user.mock.ts";
import { logger } from "../../common/utils/loggers.ts";
import { Types } from "mongoose";

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await userService.create(req.body);
      res.status(201).json({ status: "ok", payload: newUser });
    } catch (err) {
      next(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();
      res.status(200).json({ status: "ok", payload: users });
    } catch (err) {
      next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.getOne(new Types.ObjectId(id));
      res.status(200).json({ status: "ok", payload: user });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) throw new BadRequestError("ID parameter is required");
      const userUpdate = await userService.update(
        new Types.ObjectId(id),
        req.body
      );
      res.status(200).json({ status: "ok", payload: userUpdate });
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) throw new BadRequestError("ID parameter is required");
      const response = await userService.remove(new Types.ObjectId(id));
      res.status(200).json({ status: "ok", payload: response });
    } catch (err) {
      next(err);
    }
  }

  async createUserMocks(req: Request, res: Response, next: NextFunction) {
    try {
      const { amount } = req.params;
      if (!amount) throw new BadRequestError("Amount parameter is required");

      const users = await userService.createUserMocks(Number(amount));
      res.status(201).json({ status: "ok", payload: users });
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
