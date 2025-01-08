import { TransactionStatus, PaymentStatus } from '@prisma/client';
import prisma from '../../lib/prisma';

export const getDashboardStatisticService = async () => {
  try {
    const currentDate = new Date();

    const [activeEvents, completedEvents] = await Promise.all([
      prisma.event.count({
        where: {
          endDate: {
            gt: currentDate,
          },
          isDeleted: false,
        },
      }),
      prisma.event.count({
        where: {
          endDate: {
            lte: currentDate,
          },
          isDeleted: false,
        },
      }),
    ]);

    const transactionStats = await prisma.transaction.aggregate({
      _sum: {
        totalPrice: true,
        qty: true,
      },
      where: {
        status: TransactionStatus.SUCCESS,
      },
    });

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const transactions = await prisma.transaction.groupBy({
      by: ['createdAt', 'status'],
      _count: {
        _all: true,
      },
      where: {
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const paymentStats = await prisma.payment.groupBy({
      by: ['paymentStatus'],
      _count: {
        _all: true,
      },
    });

    const monthlyData = transactions.reduce<Record<string, { successCount: number; failedCount: number }>>(
      (acc, { createdAt, status, _count }) => {
        const date = new Date(createdAt);
        const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        if (!acc[yearMonth]) {
          acc[yearMonth] = { successCount: 0, failedCount: 0 };
        }

        if (status === TransactionStatus.SUCCESS) {
          acc[yearMonth].successCount += _count._all;
        } else if (status === TransactionStatus.FAILED) {
          acc[yearMonth].failedCount += _count._all;
        }

        return acc;
      },
      {}
    );

    const processedPaymentStats = {
      pending: 0,
      success: 0,
      failed: 0,
    };

    paymentStats.forEach(({ paymentStatus, _count }) => {
      switch (paymentStatus) {
        case PaymentStatus.PENDING:
          processedPaymentStats.pending = _count._all;
          break;
        case PaymentStatus.SUCCESS:
          processedPaymentStats.success = _count._all;
          break;
        case PaymentStatus.FAILED:
          processedPaymentStats.failed = _count._all;
          break;
      }
    });

    return {
      totalRevenue: transactionStats._sum.totalPrice || 0,
      totalAttendees: transactionStats._sum.qty || 0,
      totalEvents: activeEvents + completedEvents,
      activeEvents,
      completedEvents,
      recentTransactions: Object.entries(monthlyData).map(([month, counts]) => ({
        month,
        ...counts,
      })),
      paymentStats: processedPaymentStats,
    };
  } catch (error) {
    throw error;
  }
};