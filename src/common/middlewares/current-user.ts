import { NotAuthorizedError } from "./../errors/not-authorized-error";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { UserDoc } from "../../models/user";

interface UserPayload {
  id: string;
  email: string;
  iat: string;
  exp: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
      userData?: UserDoc;
    }
  }
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return next();
  }

  const jwtToken = req.headers.authorization.split(" ")[1];

  try {
    const payload = jwt.verify(
      jwtToken,
      "key"
      //   process.env.JWT_KEY!
    ) as unknown as UserPayload;

    req.currentUser = payload;
  } catch (err) {
    throw new NotAuthorizedError();
  }

  next();
};
