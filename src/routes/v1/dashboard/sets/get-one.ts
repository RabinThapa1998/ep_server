import { Router } from "express";
import { getOneSetsHandler } from "../../../../controllers/v1/dashboard/sets/get-one";
import { body, param } from "express-validator";
import { isValidObjectId } from "../../../../services/object-id-validate";

const router = Router();
router.get(
  "/:id",
  [
    param("id")
      .notEmpty()
      .custom((id) => isValidObjectId(id))
      .withMessage("Valid class id must be provided"),
  ],
  getOneSetsHandler
);

export { router as getOneSetsRouter };
