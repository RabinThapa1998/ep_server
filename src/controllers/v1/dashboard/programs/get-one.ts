import { Request, Response } from "express";
import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Contestant } from "../../../../models/sets.model";
import { Program } from "../../../../models/programs";

const getOneProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const program = await Program.findById(id);

    if (!program) {
      throw new BadRequestError("Program not found");
    }

    const contestants = await Contestant.find({ program: id });

    return res.status(200).json({ data: { program, contestants } });
  } catch (error) {
    throw new BadRequestError(
      (error as any).message
        ? (error as any).message
        : "Failed to create Contestant. Debug Backend!"
    );
  }
};

export { getOneProgram as getOneProgramHandler };
