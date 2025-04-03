import { Router } from "express";
import userRoutes from "../modules/users/user.routes.ts";
import authRouter from "../modules/auth/auth.routes.ts";
import petRouter from "../modules/pets/pet.routes.ts";

const router = Router();

router.use("/user", userRoutes);
router.use("/auth", authRouter);
router.use("/pets", petRouter);

export default router;
