import { Router } from "express";
import { getCategoryRouter } from "./get";
import { createCategoryRouter } from "./create";

const router = Router();
router.use(getCategoryRouter);
router.use(createCategoryRouter);
export { router as indexCategoryRouter };
