import type { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service.ts";

class AuthController {
  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const newUser = await authService.registerUser(req.body);
      res.status(201).json({ status: "ok", payload: newUser });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);

      res.cookie("token", token, { maxAge: 86400000, httpOnly: true });

      res
        .status(200)
        .json({ status: "ok", message: "Login successful", token });
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
