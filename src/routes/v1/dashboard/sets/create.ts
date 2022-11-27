import { Router } from "express";
import { check, validationResult } from "express-validator";
import { validateRequest } from "../../../../common/middlewares/validate-request";
import { createSetsHandler } from "../../../../controllers/v1/dashboard/sets/create";

const router = Router();
const validateFields = [
  check("name").trim().not().isEmpty().withMessage("set name is required"),
];
router.post("/", validateFields, validateRequest, createSetsHandler);
export { router as createSetRouter };
