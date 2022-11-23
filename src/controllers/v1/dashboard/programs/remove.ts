import { Request, Response } from "express";
import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Program } from "../../../../models/programs";
import { Contestant } from "../../../../models/sets.model";

const deleteProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const _program = await Program.findById(id);

    if (!_program) {
      throw new BadRequestError("Program not found");
    }
    const _contestant = await Contestant.deleteMany({ program: id });

    const program = await Program.deleteOne({ _id: id });

    return res.status(200).json({
      message: "program deleted successfully",
      program: program.deletedCount,
      contestant: _contestant.deletedCount,
    });
  } catch (error) {
    throw new BadRequestError(
      (error as any).message
        ? (error as any).message
        : "Failed to create Contestent. Debug Backend!"
    );
  }
};

export { deleteProgram as deleteProgramHandler };
