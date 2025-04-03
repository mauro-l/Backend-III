import { Router } from "express";
import { authController } from "./auth.controller.ts";
import { validateSchema } from "../../common/middlewares/validateSchema.ts";
import { loginSchema } from "./auth.schema.ts";
import { userMockSchema } from "../users/user.schema.ts";

const router = Router();

router.post(
  "/register",
  validateSchema(userMockSchema),
  authController.registerUser
);
router.post("/login", validateSchema(loginSchema), authController.login);

export default router;
