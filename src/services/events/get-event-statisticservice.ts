// service/get-events-statistics.service.ts

import { prisma } from "../../lib/prisma";

interface EventStatisticsParams {
  userId: number;
  year?: string;
  month?: string;
  day?: string;
}

export const getEventsStatisticsService = async ({
  userId,
  year,
  month,
  day,
}: EventStatisticsParams) => {
  try {
    const filters: any = {
      eventId: {
        in: await prisma.event
          .findMany({ where: { userId }, select: { id: true } })
          .then((events) => events.map((event) => event.id)),
      },
    };

    if (year) {
      filters.createdAt = {
        gte: new Date(`${year}-01-01`),
        lt: new Date(`${Number(year) + 1}-01-01`),
      };
    }

    if (month) {
      filters.createdAt = {
        gte: new Date(`${year}-${month}-01`),
        lt:
          month === "12"
            ? new Date(`${Number(year) + 1}-01-01`)
            : new Date(`${year}-${Number(month) + 1}-01`), 
      };
    }

    if (day) {
      filters.createdAt = {
        gte: new Date(`${year}-${month}-${day}`),
        lt: new Date(`${year}-${month}-${Number(day) + 1}`),
      };
    }

    const statistics = await prisma.transaction.groupBy({
      by: ["eventId"],
      _count: { id: true },
      _sum: { totalPrice: true, qty: true },
      where: filters,
    });

    // Mengambil title dari event berdasarkan eventId
    const events = await prisma.event.findMany({
      where: { id: { in: statistics.map((stat) => stat.eventId) } },
      select: { id: true, name: true, startDate: true },
    });

    const formattedStatistics = statistics.map((stat) => {
      const event = events.find((e) => e.id === stat.eventId);
      return {
        eventId: stat.eventId,
        title: event?.name || "Unknown Event",
        startTime: event?.startDate || "Unknown Time", 
        totalTransactions: stat._count.id,
        totalRevenue: stat._sum.totalPrice || 0,
        totalTicketsSold: stat._sum.qty || 0,
      };
    });

    return formattedStatistics;
  } catch (error) {
    throw error;
  }
};