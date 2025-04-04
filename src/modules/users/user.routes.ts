import { Router } from "express";
import { userController } from "./user.controller.ts";
import { validateSchema } from "../../common/middlewares/validateSchema.ts";
import { amountParamsSchema } from "../../common/middlewares/paramsSchema.ts";
import { userSchema, userUpdateSchema } from "./user.schema.ts";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", userController.getOne);
router.put("/:id", validateSchema(userUpdateSchema), userController.update);
router.delete("/:id", userController.remove);
router.get(
  "/mocks/:amount",
  validateSchema(amountParamsSchema),
  userController.createUserMocks
);

export default router;
