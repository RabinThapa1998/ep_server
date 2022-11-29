import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Sets } from "../../../../models/sets.model";

const createSets = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  try {
    const _sets = await Sets.findOne({ name: name });
    if (_sets) {
      throw new BadRequestError("name already exists");
    }
    const newSets = await Sets.build({
      name,
    }).save();

    res.status(200).json({
      data: newSets,
    });
  } catch (error) {
    throw new BadRequestError(
      (error as any).message
        ? (error as any).message
        : "Failed to create set. Debug Backend!"
    );
  }
};

export { createSets as createSetsHandler };
