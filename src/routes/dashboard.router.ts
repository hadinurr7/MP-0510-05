import { Router } from 'express';
import { verifyToken } from '../lib/jwt';

import { getDashboardStatisticConstroller } from '../controllers/dashboard.controller';

const router = Router();

// Get Statistics Dashboard
// response
// [
// 	{
// 		name: 'Total Revenue',
// 		count: 10000
// 	},
// 	{
// 		name: 'Total Peserta',
// 		count: 12000
// 	},
// 	{
// 		name: 'Total Event',
// 		count: 8378466
// 	}
// ]

router.get(
	'/statistics',
	verifyToken,
	getDashboardStatisticConstroller,
);



export default router;
