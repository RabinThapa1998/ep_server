import { Router } from "express";
import { check, validationResult } from "express-validator";
import { validateRequest } from "../../../../common/middlewares/validate-request";
import { getCategoryHandler } from "../../../../controllers/v1/dashboard/category/get";

const router = Router();
router.get("/", getCategoryHandler);
export { router as getCategoryRouter };
