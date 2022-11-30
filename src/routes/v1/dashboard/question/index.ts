import { Router } from "express";
import { createQuestionRouter } from "./create";

const router = Router();
router.use(createQuestionRouter);

export { router as indexQuestionRouter };
