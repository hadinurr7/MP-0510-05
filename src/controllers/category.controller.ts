import { NextFunction, Request, Response } from "express";
import { getCategoriesService } from "../services/categories/get-categories.service";

export const getCategoriesController = async (
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

        const result = await getCategoriesService(query);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};