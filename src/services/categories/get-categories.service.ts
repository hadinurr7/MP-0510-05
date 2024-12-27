// services/categories.service.ts
import { Prisma } from "@prisma/client";
import { PaginationQueryParams } from "../../types/pagination";
import { prisma } from "../../lib/prisma";

interface getCategoriesQuery extends PaginationQueryParams {
    search?: string
}

export const getCategoriesService = async (query: getCategoriesQuery) => {
    try {
        const { page, sortBy, sortOrder, take, search } = query;
        const whereClause: Prisma.CategoriesWhereInput = {};

        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: "insensitive" } }
            ];
        }

        const categories = await prisma.categories.findMany({
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

        const count = await prisma.categories.count({ where: whereClause });

        return {
            data: categories,
            meta: { page, take, total: count }
        };
    } catch (error) {
        throw error;
    }
};