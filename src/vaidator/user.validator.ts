
import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validateUpdateUser = [
  body("fullname")
    .optional()
    .isString()
    .withMessage("name must be a valid string"),

  body("email").optional().isEmail().withMessage("Invalid email format"),

  body("phoneNumber")
    .optional()
    .isMobilePhone("id-ID")
    .withMessage("Invalid phone number format"),

  body("profilePicture")
    .optional()
    .isString()
    .withMessage("invalid format"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: "error", errors: errors.array()[0].msg });
      return;
    }
    next();
  },
];

export const validateChangePassword = [
  body("password").notEmpty().withMessage("Password is required"),
  body("newPassword").notEmpty().withMessage("New Password is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ message: errors.array()[0].msg });
      return;
    }

    next();
  },
];