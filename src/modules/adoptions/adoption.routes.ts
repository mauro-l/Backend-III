import { Router } from "express";
import { adoptionController } from "./adoption.controller.ts";

const router = Router();

router.get("/", adoptionController.getAllAdoptions);
router.get("/:id", adoptionController.getAdoptions);
router.post("/", adoptionController.createAdoption);

export default router;
