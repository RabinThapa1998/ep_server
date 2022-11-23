import { Request, Response } from "express";
import { User } from "../../../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../../config";
import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Password } from "../../../../services/password";
import { NotFoundError } from "../../../../common/errors/not-found-error";

const signUpUser = async (req: Request, res: Response) => {
  const saltRounds = 10;
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      console.log("🚀 ~ file: create.ts ~ line 13 ~ signUpUser ~ user", user);
      // return res.status(422).json({ message: "user already exists" });
      throw new BadRequestError("user already exists");
    }

    // const salt = await bcrypt.genSalt(saltRounds);
    // const hashedPassword = await bcrypt.hash(password, salt);
    const hashedPassword = await Password.toHash(password);
    const add = await new User({
      email: email,
      password: hashedPassword,
    }).save();
    return res.status(200).json({ message: "Sign up successful" });
  } catch (err: any) {
    throw new BadRequestError(err.message || "Fix backend");
  }
};

const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "user not found" });
      // throw new NotFoundError();
    }
    // const isPassValid = await bcrypt.compare(password, user.password);
    const isPassValid = await Password.compare(user?.password!, password);

    if (!isPassValid) {
      // return res.status(422).json({ message: "Invalid password" });
      throw new BadRequestError("Invalid password");
    }
    const token = jwt.sign({ userId: user._id }, config.app.jwtSecret);
    res.cookie("accessToken", token);
    return res.status(200).json({ mess: "sign in successfully", token: token });
  } catch (err: any) {
    throw new BadRequestError(err.message || "Fix backend");
  }
};

export { signUpUser as signUpUserHandler, signInUser as signInUserHandler };
