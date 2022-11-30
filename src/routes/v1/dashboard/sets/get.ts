import { Router } from "express";
import { getSetsHandler } from "../../../../controllers/v1/dashboard/sets/get";

const router = Router();
router.get("/", getSetsHandler);

export { router as getSetsRouter };
