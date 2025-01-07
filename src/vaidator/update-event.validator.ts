import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateUpdateEvent = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Name cannot be empty"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid start date format"),
  body("endDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid end date format")
    .custom((value, { req }) => {
      if (req.body.startDate && new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("End date must be after start date");
      }
      return true;
    }),
  body("price")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Price must be a non-negative number"),
  body("availableSeats")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Available seats must be at least 1"),
  body("cityId")
    .optional()
    .isInt()
    .withMessage("Invalid city ID"),
  body("categoryId")
    .optional()
    .isInt()
    .withMessage("Invalid category ID"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ message: errors.array()[0].msg });
      return;
    }
    next();
  },
];