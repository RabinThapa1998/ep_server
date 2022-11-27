import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../../../common/errors/bad-request-error";

const createSets = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  try {
    if (!name) {
      throw new BadRequestError("set name is required");
    }
  } catch (error) {
    throw new BadRequestError(
      (error as any).message
        ? (error as any).message
        : "Failed to create set. Debug Backend!"
    );
  }
};

export { createSets as createSetsHandler };
