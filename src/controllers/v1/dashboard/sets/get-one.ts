import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Sets } from "../../../../models/sets.model";

const getOneSets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const _sets = await Sets.findById(id).populate("questions");
    if (!_sets) {
      throw new BadRequestError("Set not found");
    }
    res.status(200).json({
      data: _sets,
    });
  } catch (error) {
    throw new BadRequestError(
      (error as any).message
        ? (error as any).message
        : "Failed to create set. Debug Backend!"
    );
  }
};

export { getOneSets as getOneSetsHandler };
