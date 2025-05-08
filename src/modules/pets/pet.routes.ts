import { Router } from "express";
import { petController } from "./pet.controller.ts";
import { validateSchema } from "../../common/middlewares/validateSchema.ts";
import { petsSchema, petsUpdateSchema } from "./pet.schema.ts";
import { amountParamsSchema } from "../../common/middlewares/paramsSchema.ts";
import { objectIdSchema } from "../../common/schemas/objectId.schema.ts";

const router = Router();

router.get("/", petController.getAll);
router.get("/:id", validateSchema(objectIdSchema), petController.getOne);
router.post("/", validateSchema(petsSchema), petController.create);
router.put("/:id", validateSchema(petsUpdateSchema), petController.update);
router.delete("/:id", validateSchema(objectIdSchema), petController.remove);
router.get(
  "/mocks/:amount",
  validateSchema(amountParamsSchema),
  petController.createPetsMocks
);

export default router;
