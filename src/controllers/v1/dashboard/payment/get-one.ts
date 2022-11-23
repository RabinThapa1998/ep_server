import { Request, Response } from "express";
import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Payment } from "../../../../models/payment";

const getOnePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const _payment = await Payment.findById({ _id: id });

    if (!_payment) {
      throw new BadRequestError("payment not found");
    }
    res.status(200).json({ data: _payment });
  } catch (err: any) {
    throw new BadRequestError(
      err.message || "Failed Backend, unable to get one payment"
    );
  }
};

export { getOnePayment as getOnePaymentHandler };
