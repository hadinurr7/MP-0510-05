import { Prisma } from "@prisma/client";
import { PaginationQueryParams } from "../../types/pagination";
import { prisma } from "../../lib/prisma";

interface getEventsQuery extends PaginationQueryParams {
  search?: string;
  categoryId?: number;
  cityId?: number;
}

export const getEventsService = async (query: getEventsQuery) => {
  try {
    const { page, sortBy, sortOrder, take, search, categoryId, cityId } = query;
    const whereClause: Prisma.EventWhereInput = {};
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }
    if (cityId) {
      whereClause.cityId = cityId;
    }

    if (search) whereClause.OR =  [{ name: { contains: search, mode: "insensitive" } }];

    const count = await prisma.event.count({ where: whereClause });

    const events = await prisma.event.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });


    return {
      data: events,
      meta: { page, take, total: count },
    };
  } catch (error) {
    throw error;
  }
};
