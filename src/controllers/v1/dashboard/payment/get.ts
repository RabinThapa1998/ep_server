import { Payment } from "../../../../models/payment";
import { Request, Response } from "express";
import { BadRequestError } from "../../../../common/errors/bad-request-error";

const getPayments = async (req: Request, res: Response) => {
  try {
    const payment = await Payment.find();
    if (!payment) {
      throw new BadRequestError("Payments empty");
    }
    return res.status(200).json({ data: payment });
  } catch (err) {
    throw new BadRequestError(
      (err as any).message
        ? (err as any).message
        : "Failed to get Payments. Debug Backend!"
    );
  }
};

export { getPayments as getPaymentsHandler };
