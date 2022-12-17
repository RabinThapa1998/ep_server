import { Router } from "express";
import { check, validationResult } from "express-validator";
import { validateRequest } from "../../../../common/middlewares/validate-request";
import { createCategoryHandler } from "../../../../controllers/v1/dashboard/category/create";

const router = Router();
const validateFields = [
  check("category").not().isEmpty().withMessage("category field is required"),
  check("sub_category")
    .isArray()
    .withMessage("sub_category is not an array")
    .notEmpty()
    .withMessage("sub_category field is empty"),
];
router.post("/", validateFields, validateRequest, createCategoryHandler);
export { router as createCategoryRouter };
