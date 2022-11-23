import { Router } from "express";
import { check, validationResult } from "express-validator";
import { validateRequest } from "../../../../common/middlewares/validate-request";
import { createContestantHandler } from "../../../../controllers/v1/dashboard/contestents/create";

const validateFields = [
  check("full_name").trim().not().isEmpty().withMessage("Fullname is required"),
  check("program").trim().not().isEmpty().withMessage("ProgramId is required"),
  check("email").normalizeEmail().isEmail().withMessage("Invalid email"),
];

const router = Router();
router.post("/", validateFields, validateRequest, createContestantHandler);
export { router as createContestantRouter };
