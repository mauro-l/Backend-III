import type { NextFunction, Request, Response } from "express";
import { userService } from "./user.service.ts";
import { BadRequestError } from "../../common/errors/errors.ts";

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req.body;
      const newUser = await userService.create(body);
      res.status(201).json({ status: "ok", payload: newUser });
    } catch (err) {
      next(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();
      res.status(200).json({ status: "ok", payload: "users" });
    } catch (err) {
      next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.getOne({ _id: id });
      res.status(200).json({ status: "ok", payload: user });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { body } = req.body;
      if (!id) throw new BadRequestError("ID parameter is required");
      const userUpdate = await userService.update(id, body);
      res.status(200).json({ status: "ok", payload: userUpdate });
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("ID parameter is required");
      }
      const response = await userService.remove(id);
      res.status(200).json({ status: "ok", payload: response });
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
