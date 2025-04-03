import { Router } from "express";
import { userController } from "./user.controller.ts";
import { validateSchema } from "../../common/middlewares/validateSchema.ts";
import { userParamsSchema } from "./user.schema.ts";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", userController.getOne);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);
router.get(
  "/mocks/:amount",
  validateSchema(userParamsSchema),
  userController.createUserMocks
);

export default router;
