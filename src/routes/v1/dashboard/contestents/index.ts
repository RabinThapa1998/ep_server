import { Router } from "express";
import { createContestantRouter } from "./create";
import { getContestantsRouter } from "./get";
import { getOneContestantRouter } from "./get-one";
import { deleteContestantRouter } from "./remove";
import { updateContestantRouter } from "./update";

const router = Router();

router.use(createContestantRouter);
router.use(getContestantsRouter);
router.use(getOneContestantRouter);
router.use(deleteContestantRouter);
router.use(updateContestantRouter);

export { router as indexContestantRouter };
