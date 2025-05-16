import { Router } from "express";
import { authController } from "./auth.controller.ts";
import { validateSchema } from "../../common/middlewares/validateSchema.ts";
import { loginSchema } from "./auth.schema.ts";
import { userSchema } from "../users/user.schema.ts";
import { loginRateLimiter } from "../../common/middlewares/rateLimits.ts";

const router = Router();

router.post(
  "/register",
  validateSchema(userSchema),
  authController.registerUser
);
router.post(
  "/login",
  loginRateLimiter,
  validateSchema(loginSchema),
  authController.login
);

export default router;
