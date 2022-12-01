import { Request, Response, NextFunction } from "express";
import { BadReqError } from "../../../../common/errors/bad-req-error";
import { Pdfs } from "../../../../models/pdf.model";
import cloudinary from "../../../../utils/cloudinary";

const createCommon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description } = req.body;
    const pdf = req.file;
    if (!req.file) throw new BadReqError("File is required");
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      folder: "flutter_ep",
      pages: true,
    });

    const newPdfs = await Pdfs.build({
      title,
      description,
      url: result.secure_url,
    }).save();

    return res.status(200).json(newPdfs);
  } catch (error: any) {
    throw new BadReqError(error.message || "Something went wrong");
  }
};

export { createCommon as createCommonHandler };
