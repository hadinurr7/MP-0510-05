import { NextFunction, Request, Response } from 'express';
import { getDashboardStatisticService } from '../services/dashboard/get-dashboard-statistic-service';

export const getDashboardStatisticConstroller = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userId = Number(res.locals.user.id);
		const result = await getDashboardStatisticService()
		// const result = await resetPasswordService(userId, req.body.password);
		res.status(200).send({
			totalRevenue: result.totalRevenue,
			totalAttendees: result.totalAttendees,
			totalEvent: result.totalEvent,
			chart: result.chart
		});
	} catch (error) {
		next(error);
	}
};
