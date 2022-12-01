import { Router } from "express";
import { BadRequestError } from "../../../common/errors/bad-request-error";
import { indexCommonRouter } from "./common";
import { indexQuestionRouter } from "./question";

import { indexSetRouter } from "./sets";

const router = Router();

router.use("/sets", indexSetRouter);
router.use("/question", indexQuestionRouter);
router.use("/common", indexCommonRouter);

export { router as indexDashboardRouter };
