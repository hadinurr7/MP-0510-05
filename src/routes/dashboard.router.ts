import { Router } from 'express';
import { verifyToken } from '../lib/jwt';

import { getDashboardStatisticConstroller } from '../controllers/dashboard.controller';

const router = Router();

router.get(
    '/statistics',
    verifyToken,
    getDashboardStatisticConstroller,
);



export default router;