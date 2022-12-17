import { Category } from "../../../../models/category.model";

import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Request, Response } from "express";

const createCategory = async (req: Request, res: Response) => {
  try {
    const { category, sub_category } = req.body;
    const _category = await Category.findOne({
      category,
    });
    if (_category) throw new BadRequestError("Category Already Exists");
    const newCategory = await Category.build({
      category,
      sub_category,
    }).save();
    res.status(200).json({
      data: newCategory,
    });
  } catch (error: any) {
    throw new BadRequestError(
      error.message || "Something went wrong |createcategory controller"
    );
  }
};

export { createCategory as createCategoryHandler };
