// services/cities.service.ts
import { Prisma } from "@prisma/client";
import { PaginationQueryParams } from "../../types/pagination";
import { prisma } from "../../lib/prisma";

interface getCityQuery extends PaginationQueryParams {
    search?: string
}

export const getCitiesService = async (query: getCityQuery) => {
    try {
        const { page, sortBy, sortOrder, take, search } = query;
        const whereClause: Prisma.CitiesWhereInput = {};

        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: "insensitive" } }
            ];
        }

        const cities = await prisma.cities.findMany({
            where: whereClause,
            skip: (page - 1) * take,
            take: take,
            orderBy: {
                [sortBy]: sortOrder,
            },
            include: {
                events: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });

        const count = await prisma.cities.count({ where: whereClause });

        return {
            data: cities,
            meta: { page, take, total: count }
        };
    } catch (error) {
        throw error;
    }
};