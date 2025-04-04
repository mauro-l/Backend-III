import { Router } from "express";
import { petController } from "./pet.controller.ts";
import { validateSchema } from "../../common/middlewares/validateSchema.ts";
import { petsSchema } from "./pet.schema.ts";
import { amountParamsSchema } from "../../common/middlewares/paramsSchema.ts";

const router = Router();

router.get("/", petController.getAll);
router.get("/one", petController.getOne);
router.post("/", validateSchema(petsSchema), petController.create);
router.put("/:id", petController.update);
router.delete("/:id", petController.remove);
router.get(
  "/mocks/:amount",
  validateSchema(amountParamsSchema),
  petController.createPetsMocks
);

export default router;
