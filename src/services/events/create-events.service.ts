import { Event } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { cloudinaryUpload } from "../../lib/cloudinary";
import { redisClient } from "../../lib/redis";

export const createEventService = async (
  body: Event,
  image: Express.Multer.File
) => {
  try {
    const { name, description, seatsCategory, price, seatsQuantity, location, startDate, endDate, category } = body;
    const { secure_url } = await cloudinaryUpload(image);

    console.log(secure_url);

    const newEventData = await prisma.event.create({
      data: {
        name,
        description,
        seatsCategory,
        price: parseFloat(price),
        seatsQuantity: parseInt(seatsQuantity, 10),
        location,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        category,
        thumbnail: secure_url,
      },
    });

    await redisClient.setEx("eventData", 3600, JSON.stringify(newEventData));
    return newEventData;
  } catch (error) {
    throw error;
  }
};
