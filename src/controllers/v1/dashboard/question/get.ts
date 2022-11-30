import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Question } from "../../../../models/question.model";

const getQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questions = await Question.find({});
    res.status(200).json({
      data: questions,
    });
  } catch (error) {
    throw new BadRequestError(
      (error as any).message
        ? (error as any).message
        : "Failed to create set. Debug Backend!"
    );
  }
};

export { getQuestions as getQuestionsHandler };
