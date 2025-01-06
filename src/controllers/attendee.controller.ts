// controllers/attendees/getAttendeesByEvent.controller.ts
import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { getAttendeesByEventService } from "../services/attendee/get-attendee.service";

export const getAttendeesByEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const eventId = Number(req.params.eventId);
    const userId = Number(req.params.id);

    // Validasi ID event dan ID pengguna
    if (isNaN(eventId) || isNaN(userId)) {
      res.status(400).json({ error: "Invalid event ID or user ID" });
      return;
    }

    // Cek apakah pengguna ada
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Cek apakah event yang diminta sesuai dengan user
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { userId: true },
    });

    if (!event || event.userId !== userId) {
      res.status(403).json({ error: "Unauthorized access" });
      return;
    }

    // Panggil service untuk mengambil data peserta
    const attendees = await getAttendeesByEventService(eventId, userId);

    res.status(200).json(attendees);
  } catch (error) {
    next(error);
  }
};
