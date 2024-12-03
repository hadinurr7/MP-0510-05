import { NextFunction, Request, Response } from "express";
import { getSamplesServices } from "../services/sample/get-samples.services";

export const getSamplesController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const result = await getSamplesServices();
    response.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
