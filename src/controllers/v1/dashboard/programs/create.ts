import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Program } from "../../../../models/programs";

const createPrograms = async (req: Request, res: Response) => {
  try {
    const { name, desc, image_url, payment_schema } = req.body;

    const program = await Program.findOne({ name: name });
    if (program) {
      throw new BadRequestError("Program already exists");
    }

    const _program = await Program.build({
      name,
      desc,
      image_url,
      payment_schema,
    }).save();

    return res
      .status(200)
      .json({ message: "Program added successfully", data: _program });
  } catch (error: any) {
    throw new BadRequestError(
      error.message || "Failed to create Contestent. Debug Backend!"
    );
  }
};

export { createPrograms as createProgramHandler };
