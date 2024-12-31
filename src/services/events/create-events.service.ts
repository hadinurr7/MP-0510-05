import { cloudinaryUpload } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";

interface CreateEventBody {
  name: string;
  userId: number;
  description: string;
  categoryId: number;
  startDate: Date;
  endDate: Date;
  price: number;
  cityId: number;
  availableSeats: number;
}

export const createEventService = async (
  body: CreateEventBody,
  thumbnail: Express.Multer.File,
) => {
  try {
    const { name, description, categoryId, startDate, endDate, price, cityId, userId, availableSeats } = body;

    const existingEvent = await prisma.event.findFirst({
      where: { name },
    });

    if (existingEvent) {
      throw new Error("Event already exists");
    }

    const { secure_url } = await cloudinaryUpload(thumbnail);

    const newEvent = await prisma.event.create({
      data: {
        ...body,
        thumbnail: secure_url,
        price: Number(price),
        availableSeats: Number(availableSeats),
        categoryId: Number(categoryId),
        cityId: Number(cityId),
        userId: 1,
      },
      // select: {
      //   // Category: true,  // Sesuai dengan nama relasi di schema
      //   Cities: true,    // Ini sudah benar
      //   User: true      // Ini sudah benar
      // }
    });

    console.log(newEvent);
    

    return newEvent;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};