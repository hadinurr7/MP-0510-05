import { prisma } from "../../lib/prisma";

export const getEventService = async (id: number) => {
  try {
    const event = await prisma.event.findFirst({
      where: { id },
      include: { User: { select: { fullname: true } } },
    });

    if (!event) {
      throw new Error("invalid event id");
    }
    return event;
  } catch (error) {
    throw error;
  }
};