import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Sets } from "../../../../models/sets.model";

const getSets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sets = await Sets.find({});
    res.status(200).json({
      data: sets,
    });
  } catch (error) {
    throw new BadRequestError(
      (error as any).message
        ? (error as any).message
        : "Failed to create set. Debug Backend!"
    );
  }
};

export { getSets as getSetsHandler };
