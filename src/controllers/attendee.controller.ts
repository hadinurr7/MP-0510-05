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
    const userId = Number(res.locals.user.id);
    
    console.log( "ini eventId:", eventId);
    console.log("ini userId :", userId);

    if (isNaN(eventId) || isNaN(userId)) {
      res.status(400).send({ error: "Invalid event ID or user ID" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { userId: true, name: true },
    });

    if (!event) {
      res.status(404).send({ error: "Event not found" });
      return;
    }

    if (event.userId !== userId) {
      res.status(403).send({ error: "Unauthorized access" });
      return;
    }

    const attendees = await getAttendeesByEventService(eventId, userId);

    res.status(200).send({
      eventName: event.name,
      attendees: attendees,
    });
  } catch (error) {
    next(error);
  }
};
