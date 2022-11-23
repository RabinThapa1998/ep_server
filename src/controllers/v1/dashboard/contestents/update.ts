import { Request, Response } from "express";
import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Contestant } from "../../../../models/sets.model";

const updateContestant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { full_name, age, address, program, phone, email } = req.body;
    const contestant = await Contestant.findOne({ _id: id });
    if (!contestant) {
      throw new BadRequestError("Contestant not found");
    }

    contestant.email = email || contestant.email;
    contestant.full_name = full_name || contestant.full_name;
    contestant.program = program || contestant.program;
    contestant.address = address || contestant.address;
    contestant.age = age || contestant.age;
    contestant.phone = phone || contestant.phone;

    await contestant.save();

    return res
      .status(200)
      .json({ message: "Updated successfully", data: contestant });
  } catch (error) {
    throw new BadRequestError(
      (error as any).message
        ? (error as any).message
        : "Failed to create Contestant. Debug Backend!"
    );
  }
};

export { updateContestant as updateContestantHandler };
