import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Contestant } from "../../../../models/sets.model";
import { Payment } from "../../../../models/payment";
import { Program } from "../../../../models/programs";

const createContestant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { full_name, age, address, program, phone, email } = req.body;

    const _program = await Program.findById(program);

    if (!_program) {
      return res.status(422).json({ message: "Program not found" });
    }

    const contestant = await Contestant.findOne({ email });

    if (contestant) {
      throw new BadRequestError("Contestant already exists");
    }
    //create payment for that contestant and assign the payment id to the contestant
    const payment = await Payment.build({
      payments: [{}],
    }).save();
    if (!payment) {
      throw new BadRequestError("payment create failed");
    }
    const _contestant = await Contestant.build({
      email,
      full_name,
      program,
      payment: payment._id,
      address,
      age,
      phone,
    }).save();

    if (!_contestant) {
      throw new BadRequestError("Contestant not created");
    }

    return res.status(200).json({
      message: "Contestant added successfully",
      data: _contestant,
    });
  } catch (error) {
    throw new BadRequestError(
      (error as any).message
        ? (error as any).message
        : "Failed to create Contestant. Debug Backend!"
    );
  }
};

export { createContestant as createContestantHandler };
