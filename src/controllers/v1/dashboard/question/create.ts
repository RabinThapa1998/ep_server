import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Question } from "../../../../models/question.model";

const createQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { question, options, sets, correct, desc } = req.body;
  console.log("🚀 ~ file: create.ts:11 ~ options", options);
  try {
    const _question = await Question.findOne({ question });
    if (_question) {
      throw new BadRequestError("question already exists");
    }
    const newQuestion = await Question.build({
      question,
      options,
      sets,
      correct,
      desc,
    }).save();

    res.status(200).json({
      data: newQuestion,
    });
  } catch (error) {
    throw new BadRequestError(
      (error as any).message
        ? (error as any).message
        : "Failed to create set. Debug Backend!"
    );
  }
};

export { createQuestion as createQuestionHandler };
