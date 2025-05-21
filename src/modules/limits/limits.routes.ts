import { Router } from "express";
import { limitStatus } from "./limits.controller.ts";

const router = Router();

router.get("/status", limitStatus.getLimit);

export default router;
