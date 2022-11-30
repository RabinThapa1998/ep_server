import { Router } from "express";
import { check, validationResult } from "express-validator";
import { validateRequest } from "../../../../common/middlewares/validate-request";
import { getQuestionsHandler } from "../../../../controllers/v1/dashboard/question/get";

const router = Router();
router.get("/", getQuestionsHandler);
export { router as getQuestionRouter };
