import { NextFunction, Request, Response } from "express";
import { getTransactionsService } from "../services/get-transactions-history.service"; // Sudah diperbaiki

export const getTransactionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getTransactionsService({
      page: req.body.page,
      size: req.body.size,
    });

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
