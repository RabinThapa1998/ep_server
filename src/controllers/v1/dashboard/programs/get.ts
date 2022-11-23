import { Request, Response } from "express";
import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Program } from "../../../../models/programs";

const getProgram = async (req: Request, res: Response) => {
  try {
    const _program = await Program.find();
    if (!_program.length) {
      throw new BadRequestError("No programs found!");
    }

    return res.status(200).json({ data: _program });
  } catch (err) {
    throw new BadRequestError("programs error");
  }
};

export { getProgram as getProgramHandler };
