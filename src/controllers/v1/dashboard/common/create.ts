import { Request, Response, NextFunction } from "express";
import { BadReqError } from "../../../../common/errors/bad-req-error";
import cloudinary from "../../../../utils/cloudinary";

const createCommon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, desc } = req.body;
    const pdf = req.file;
    if (!req.file) throw new BadReqError("File is required");
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      folder: "flutter_ep",
      pages: true,
    });
    return res.status(200).json(result);
  } catch (error: any) {
    throw new BadReqError(error.message || "Something went wrong");
  }
};

export { createCommon as createCommonHandler };
