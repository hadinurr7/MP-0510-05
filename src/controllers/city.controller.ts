import { NextFunction, Request, Response } from "express";
import { getCitiesService } from "../services/cities/get-cities.service";

export const getCitiesController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const query = {
            take: parseInt(req.query.take as string) || 3,
            page: parseInt(req.query.page as string) || 1,
            sortBy: (req.query.sortBy as string) || "id",
            sortOrder: (req.query.sortBy as string) || "desc",
            search: (req.query.search as string) || "",
        };

        const result = await getCitiesService(query);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};