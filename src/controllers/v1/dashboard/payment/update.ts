import { Payment } from "../../../../models/payment";
import { Request, Response } from "express";
import { BadRequestError } from "../../../../common/errors/bad-request-error";

const updatePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { vote, amount, payment_type } = req.body;
    const payment = await Payment.findById(id);
    if (!payment) {
      throw new BadRequestError("Payment Not Found");
    }

    payment.payments.push({ vote, amount, payment_type });
    await payment.save();

    res.status(200).json({ message: "Updated Successfully", data: payment });
  } catch (err: any) {
    throw new BadRequestError(
      err.message || "Failed to update payment. Debug Backend!"
    );
  }
};

export { updatePayment as updatePaymentHandler };
