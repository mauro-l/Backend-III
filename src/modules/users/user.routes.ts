import { Router } from "express";
import { userController } from "./user.controller.ts";
import { validateSchema } from "../../common/middlewares/validateSchema.ts";
import { amountParamsSchema } from "../../common/middlewares/paramsSchema.ts";
import { userUpdateSchema } from "./user.schema.ts";
import { objectIdSchema } from "../../common/schemas/objectId.schema.ts";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", validateSchema(objectIdSchema), userController.getOne);
router.put("/:id", validateSchema(userUpdateSchema), userController.update);
router.delete("/:id", validateSchema(objectIdSchema), userController.remove);
router.delete("/delete/all", userController.removeAll);
router.get(
  "/mocks/:amount",
  validateSchema(amountParamsSchema),
  userController.createUserMocks
);

export default router;
