// services/categories.service.ts
import { Prisma } from "@prisma/client";
import { PaginationQueryParams } from "../../types/pagination";
import prisma from "../../lib/prisma";

interface getCategoriesQuery extends PaginationQueryParams {
    search?: string
}

export const getCategoriesService = async (query: getCategoriesQuery) => {
    try {
        const { page, sortBy, sortOrder, take, search } = query;
        const whereClause: Prisma.CategoryWhereInput = {};

        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: "insensitive" } }
            ];
        }

        const category = await prisma.category.findMany({
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

        const count = await prisma.category.count({ where: whereClause });

        return {
            data: category,
            meta: { page, take, total: count }
        };
    } catch (error) {
        throw error;
    }
};