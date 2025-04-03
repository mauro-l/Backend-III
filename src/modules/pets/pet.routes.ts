import { Router } from "express";
import { petController } from "./pet.controller.ts";

const router = Router();

router.get("/", petController.getAll);
router.get("/one", petController.getOne);
router.post("/", petController.create);
router.put("/:id", petController.update);
router.delete("/one", petController.remove);

export default router;
