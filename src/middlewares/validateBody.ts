import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { HttpError } from "../helpers/HttpError";

const validateBody = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new HttpError(400, error.details[0].message));
    } else {
      next();
    }
  };
};

export default validateBody;
