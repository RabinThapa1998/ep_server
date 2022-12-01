import { Router } from "express";
import { createCommonHandler } from "../../../../controllers/v1/dashboard/common/create";
import upload from "../../../../utils/multer";

const router = Router();
router.post("/", upload.single("pdf"), createCommonHandler);
export { router as createCommonRouter };
