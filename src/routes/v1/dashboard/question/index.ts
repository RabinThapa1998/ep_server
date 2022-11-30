import { Router } from "express";
import { createQuestionRouter } from "./create";
import { getQuestionRouter } from "./get";

const router = Router();
router.use(createQuestionRouter);
router.use(getQuestionRouter);

export { router as indexQuestionRouter };
