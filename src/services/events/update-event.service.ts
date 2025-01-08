import { cloudinaryUpload } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";

interface UpdateEventBody {
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  price?: number;
  availableSeats?: number;
  cityId?: number;
  categoryId?: number;
}


export const updateEventService = async (
    eventId: number,
    userId: number,
    body: UpdateEventBody,
    thumbnail?: Express.Multer.File,
  ) => {
    try {
      const event = await prisma.event.findFirst({
        where: { 
          id: eventId,
          userId,
          isDeleted: false 
        },
      });
  
      if (!event) {
        throw new Error("Event not found or unauthorized");
      }
  
      let thumbnailUrl = event.thumbnail;
      if (thumbnail) {
        const { secure_url } = await cloudinaryUpload(thumbnail);
        thumbnailUrl = secure_url;
      }
  
      return await prisma.event.update({
        where: { id: eventId },
        data: {
          ...body,
          thumbnail: thumbnailUrl,
          updatedAt: new Date(),
        },
        include: {
          city: true,
          category: true,
        },
      });
    } catch (error) {
      throw error;
    }
  };