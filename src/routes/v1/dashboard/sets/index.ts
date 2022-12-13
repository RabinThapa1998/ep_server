import { Router } from "express";
import { createSetRouter } from "./create";
import { getSetsRouter } from "./get";
import { getOneSetsRouter } from "./get-one";

const router = Router();

router.use(createSetRouter);
router.use(getSetsRouter);
router.use(getOneSetsRouter);

export { router as indexSetRouter };
