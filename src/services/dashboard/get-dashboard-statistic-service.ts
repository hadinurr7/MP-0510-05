import { prisma } from '../../lib/prisma';

export const getDashboardStatisticService = async () => {
	try {
		const events = await prisma.event.findMany({
			select: {
				id: true,
			},
			distinct: ['id'],
		});

		const statistics = await prisma.transaction.aggregate({
			_sum: {
				totalPrice: true,
				qty: true,
			},
		});

		const transactions = await prisma.transaction.groupBy({
			by: ['createdAt'],
			_count: {
			  _all: true,
			},
			orderBy: {
			  createdAt: 'asc',
			},
		  });
		
		  // Group data by year-month
		  const groupedData = transactions.reduce<Record<string, number>>((acc, { createdAt, _count }) => {
			const date = new Date(createdAt);
			const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
		
			if (!acc[yearMonth]) {
			  acc[yearMonth] = 0;
			}
		
			acc[yearMonth] += _count._all;
		
			return acc;
		  }, {});
	

		return {
			totalRevenue: statistics._sum.totalPrice,
			totalAttendees: statistics._sum.qty,
			totalEvent: events.length || 0,
			chart: Object.entries(groupedData).map(([month, count]) => ({
				month,
				count,
			  }))
		};
	} catch (error) {
		throw error;
	}
};
