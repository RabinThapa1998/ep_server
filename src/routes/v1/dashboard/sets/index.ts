import { Router } from "express";
import { createSetRouter } from "./create";
import { getSetsRouter } from "./get";

const router = Router();

router.use(createSetRouter);
router.use(getSetsRouter);

export { router as indexSetRouter };
