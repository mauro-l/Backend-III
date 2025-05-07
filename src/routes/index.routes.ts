import { Router, type Request, type Response } from "express";
import userRoutes from "../modules/users/user.routes.ts";
import authRouter from "../modules/auth/auth.routes.ts";
import petRouter from "../modules/pets/pet.routes.ts";
import adoptionRouter from "../modules/adoptions/adoption.routes.ts";

const router = Router();

router.use("/user", userRoutes);
router.use("/auth", authRouter);
router.use("/pets", petRouter);
router.use("/adoption", adoptionRouter);
router.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: `Cannot ${req.method} ${req.originalUrl}. Route not found.`,
  });
});

export default router;
