import { Router } from "express";
import { BadRequestError } from "../../../common/errors/bad-request-error";
import { indexQuestionRouter } from "./question";

import { indexSetRouter } from "./sets";

const router = Router();

router.use("/sets", indexSetRouter);
router.use("/question", indexQuestionRouter);

export { router as indexDashboardRouter };
