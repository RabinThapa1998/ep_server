import { Router } from "express";
import { BadRequestError } from "../../../common/errors/bad-request-error";

import { indexContestantRouter } from "./contestents";

const router = Router();

router.use("/contestants", indexContestantRouter);

export { router as indexDashboardRouter };
