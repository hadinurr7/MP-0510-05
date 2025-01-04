import { prisma } from "../lib/prisma";

interface TransactionsPayload {
  eventName?: string;
  page: number;
  size: number;
}

export const getTransactionsService = async (payload: TransactionsPayload) => {
  try {
    // Default to page 1 and size 10 if not provided
    const page = payload.page > 0 ? payload.page : 1;
    const size = payload.size > 0 ? payload.size : 10;

    const transaction = await prisma.transaction.findMany({
      where: {
        event: {
          name: payload.eventName,
        },
      },
      include: {
        event: {
          select: {
            name: true,
            thumbnail: true,
            description: true,
          },
        },
      },
      take: size,
      skip: (page - 1) * size,
    });

    return transaction;
  } catch (error) {
    throw error;
  }
};
