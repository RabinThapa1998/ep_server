import { Router } from "express";
import { check, validationResult } from "express-validator";
import { validateRequest } from "../../../../common/middlewares/validate-request";
import { createQuestionHandler } from "../../../../controllers/v1/dashboard/question/create";

const router = Router();
const validateFields = [
  check("question")
    .trim()
    .not()
    .isEmpty()
    .withMessage("question field is required"),
  check("options")
    .isArray()
    .withMessage("Options is not an array")
    .notEmpty()
    .withMessage("options field is empty"),
  check("sets").trim().not().isEmpty().withMessage("sets field is required"),
  check("correct")
    .trim()
    .not()
    .isEmpty()
    .withMessage("correct field is required"),
];
router.post("/", validateFields, validateRequest, createQuestionHandler);
export { router as createQuestionRouter };
