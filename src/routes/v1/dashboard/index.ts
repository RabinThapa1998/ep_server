import { Router } from "express";
import { BadRequestError } from "../../../common/errors/bad-request-error";

import { indexSetRouter } from "./sets";

const router = Router();

router.use("/sets", indexSetRouter);

export { router as indexDashboardRouter };
