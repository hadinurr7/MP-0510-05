// services/attendee/get-attendees.service.ts
import { prisma } from "../../lib/prisma";

export const getAttendeesByEventService = async (eventId: number, userId: number) => {
  try {
    // Validasi user dan event
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { userId: true },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    if (event.userId !== userId) {
      throw new Error("Unauthorized access");
    }

    // Mengambil data peserta
    const attendees = await prisma.transaction.findMany({
      where: { eventId, status: "SUCCESS" },
      select: {
        user: {
          select: {
            fullname: true,
            email: true,
          },
        },
        qty: true,
        totalPrice: true,
      },
    });

    return attendees.map((attendee) => ({
      name: attendee.user.fullname,
      email: attendee.user.email,
      qty: attendee.qty,
      totalPrice: attendee.totalPrice,
    }));
  } catch (error) {
    throw error
  }
};
