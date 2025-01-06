import { NextFunction, Request, Response } from "express";
import { getEventsService } from "../services/events/get-events.service";
import { createEventService } from "../services/events/create-events.service";
import { getEventsByUserService } from "../services/events/get-events-by-user.service";

export const getEventsController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query = {
        take: parseInt(req.query.take as string) || 3,
        page: parseInt(req.query.page as string) || 1,
        sortBy: (req.query.sortBy as string) || "createdAt",
        sortOrder: (req.query.sortBy as string) || "desc",
        search: (req.query.search as string) || "",
        categoryId: parseInt(req.query.categoryId as string) || undefined,
        cityId: parseInt(req.query.cityId as string) || undefined
      };
      const result = await getEventsService(query);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  export const createEventController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  
      console.log(files);
        
      const result = await createEventService(
        req.body,
        files.thumbnail?.[0],
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  export const getEventsByUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.user.id;
  
      const result = await getEventsByUserService(userId);
  
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };