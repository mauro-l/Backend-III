import type { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service.ts";
import { fi } from "@faker-js/faker";
import { envsConfig } from "../../config/envs.config.ts";

class AuthController {
  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const newUser = await authService.registerUser(req.body);
      const { password, pets, ...newPayload } = newUser;
      res.status(201).json({ status: "ok", payload: newPayload });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);

      res.cookie("token", token, {
        maxAge: 30 * 60 * 1000, // 30 minutos, como el JWT
        httpOnly: true, // solo accesible desde el backend
        secure: envsConfig.NODE_ENV === "production", // solo se envía por HTTPS en prod
        sameSite: "strict", // evita que se envíe en requests cross-site
      });

      res.status(200).json({ status: "ok", message: "Login successful" });
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
