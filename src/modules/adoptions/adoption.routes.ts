import { Router } from "express";
import { adoptionController } from "./adoption.controller.ts";
import { validateSchema } from "../../common/middlewares/validateSchema.ts";
import { objectIdSchema } from "../../common/schemas/objectId.schema.ts";
import { adoptionSchema } from "./adoption.schema.ts";

const router = Router();

router.get("/", adoptionController.getAllAdoptions);
router.get(
  "/:id",
  validateSchema(objectIdSchema),
  adoptionController.getAdoption
);
router.post(
  "/",
  validateSchema(adoptionSchema),
  adoptionController.createAdoption
);

export default router;
