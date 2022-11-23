import { Request, Response } from "express";
import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Contestant } from "../../../../models/sets.model";

const deleteContestant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contestant = await Contestant.deleteOne({ _id: id });
    if (!contestant) {
      throw new BadRequestError("Contestant not found");
    }

    return res
      .status(200)
      .json({ message: "deleted successfully", data: contestant });
  } catch (error) {
    throw new BadRequestError(
      (error as any).message
        ? (error as any).message
        : "Failed to create Contestant. Debug Backend!"
    );
  }
};

export { deleteContestant as deleteContestantHandler };
