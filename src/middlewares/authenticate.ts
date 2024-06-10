import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "../helpers";
import { UserDto } from "../types/Dto";
import { AuthenticatedRequest } from "../types/types";
import { UserService } from "../services/users.service";

export const aunthenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(new HttpError(401, "Invalid Bearer token"));
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as UserDto;

    const user = await UserService.getUserById(id!);

    if (!user) {
      return next(new HttpError(401, "User not authorized"));
    }

    req.user = { id: user.id!, name: user.name, email: user.email };

    next();
  } catch (error) {
    next(new HttpError(401, "User not authorized"));
  }
};
