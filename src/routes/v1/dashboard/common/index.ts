import { createCommonRouter } from "./create";
import { Router } from "express";

const router = Router();
router.use(createCommonRouter);

export { router as indexCommonRouter };
