import { prisma } from "../../lib/prisma";

export const getAttendeesByEventService = async (eventId: number, userId: number, page: number = 1, take: number = 10) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Validasi event dan ambil nama event
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        userId: true,
        name: true,
      },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    if (event.userId !== userId) {
      throw new Error("Unauthorized access");
    }

    // Mengambil data peserta dengan pagination
    const attendees = await prisma.transaction.findMany({
      where: { eventId, status: "SUCCESS" },
      skip: (page - 1) * take,
      take,
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

    // Menghitung total peserta
    const totalAttendees = await prisma.transaction.count({
      where: { eventId, status: "SUCCESS" },
    });

    return {
      eventName: event.name,
      totalAttendees,
      attendees: attendees.map((attendee) => ({
        name: attendee.user.fullname,
        email: attendee.user.email,
        qty: attendee.qty,
        totalPrice: attendee.totalPrice,
      })),
    };
  } catch (error) {
    console.error(error); // Log error
    throw new Error("Failed to fetch attendees. Please try again later.");
  }
};
