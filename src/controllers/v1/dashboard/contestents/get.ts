import { Request, Response } from "express";
import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Contestant } from "../../../../models/sets.model";

const getContestants = async (req: Request, res: Response) => {
  try {
    const contestants = await Contestant.find();

    if (!contestants) {
      throw new BadRequestError("Contestants not found");
    }

    return res.status(200).json({ data: contestants });
  } catch (error) {
    throw new BadRequestError(
      (error as any).message
        ? (error as any).message
        : "Failed to create Contestant. Debug Backend!"
    );
  }
};

export { getContestants as getContestantsHandler };
