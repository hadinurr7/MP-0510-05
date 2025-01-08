import { NextFunction, Request, Response } from 'express';
import { getDashboardStatisticService } from '../services/dashboard/get-dashboard-statistic-service';

export const getDashboardStatisticConstroller = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await getDashboardStatisticService()
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};

