import { Category } from "../../../../models/category.model";

import { BadReqError } from "../../../../common/errors/bad-req-error";
import { Request, Response } from "express";

const getCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.find();
    if (!category) throw new BadReqError("Category Empty");
    res.status(200).json({
      data: category,
    });
  } catch (error: any) {
    throw new BadReqError(
      error.message || "Something went wrong |getcategory controller"
    );
  }
};

export { getCategory as getCategoryHandler };
