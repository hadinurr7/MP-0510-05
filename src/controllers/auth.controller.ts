import { NextFunction, Request, Response } from "express";
import { loginService } from "../services/auth/login.service";
import { forgotPasswordService } from "../services/auth/forgot-password.service";
import { resetPasswordService } from "../services/auth/reset-password.service";
import {registerService} from "../services/auth/register.service";
import { OrganizerRegisterService } from "../services/auth/organizer-register";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await registerService(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const organizerRegisterController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await OrganizerRegisterService(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await loginService(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await forgotPasswordService(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(res.locals.user.id);
    const result = await resetPasswordService(userId, req.body.password);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
