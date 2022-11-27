import { Router } from "express";
import { createSetRouter } from "./create";

const router = Router();

router.use(createSetRouter);

export { router as indexSetRouter };
