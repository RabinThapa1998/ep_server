import { Request, Response } from "express";
import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Contestant } from "../../../../models/sets.model";

const getOneContestant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contestant = await Contestant.findById(id)
      .populate("program")
      .populate("payment");
    if (!contestant) {
      throw new BadRequestError("Contestant not found");
    }

    return res.status(200).json({ data: contestant });
  } catch (error) {
    throw new BadRequestError(
      (error as any).message
        ? (error as any).message
        : "Failed to create Contestant. Debug Backend!"
    );
  }
};

export { getOneContestant as getOneContestantHandler };
