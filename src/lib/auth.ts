import { Request, Response, NextFunction } from "express";

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (user && user.role == "ORGANIZER") {
    return next();
  }

  res.status(403).json({
    status: "error",
    message: "You are not allowed to perform this action.",
  });
};