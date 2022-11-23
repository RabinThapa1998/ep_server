import { Router } from "express";
import { getContestantsHandler } from "../../../../controllers/v1/dashboard/contestents/get";

const router = Router();
router.get("/", getContestantsHandler);

export { router as getContestantsRouter };
