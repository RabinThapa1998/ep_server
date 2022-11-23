import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Program } from "../../../../models/programs";
import cloudinary from "../../../../utils/cloudinary";
import upload from "../../../../utils/multer";

const createCommon = async (req: Request, res: Response) => {
  try {
    if (!req.file) throw new BadRequestError("File is required");

    const result = await cloudinary.uploader.upload(req.file.path);

    return res.status(200).json(result);
  } catch (error: any) {
    throw new BadRequestError(
      error.message || "Failed to upload file. Debug Backend!"
    );
  }
};

export { createCommon as createCommonHandler };
