import { cloudinaryRemove, cloudinaryUpload } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";

// interface UpdateProfileBody {
//   fullname: string;
// }

// export const updateUserService = async (
//   body: UpdateProfileBody,
//   profilePicture: Express.Multer.File | undefined,
//   userId: number
// ) => {
//   try {
    
//     console.log("User ID:", userId);
//     console.log("Body:", body);
//     console.log("Profile Picture File:", profilePicture);

//     const user = await prisma.user.findFirst({
//       where: { id: userId }
//     });

//     console.log("ini user dari database:", user);

//     if (!user) {
//       throw new Error("Invalid user id");
//     }

//     let secure_url: string | undefined;

//     if (profilePicture) {

//       console.log("Profile Picture File Detected");

//       if (user.profilePicture) {
//         console.log("Removing existing profile picture:", user.profilePicture);
//         await cloudinaryRemove(user.profilePicture);
//       }

//       const uploadResult = await cloudinaryUpload(profilePicture);

//       console.log("hasil update:", uploadResult);

//       secure_url = uploadResult.secure_url;
//     }

//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: secure_url ? { ...body, profilePicture: secure_url } : body,
//     });

//     console.log("Updated User:", updatedUser);

//     return { message: "Update profile success" };
//   } catch (error) {
//     console.error("Error in updateProfileService:", error);

//     throw new Error(
//       error instanceof Error ? error.message : "An unknown error occurred"
//     );
//   }
// };

// interface UpdateProfileBody {
//   fullname: string;
// }

// export const updateUserService = async (
//   body: UpdateProfileBody,
//   profilePicture: Express.Multer.File | undefined,
//   userId: number
// ) => {
//   try {
//     const user = await prisma.user.findFirst({
//       where: { id: userId },
//     });

//     if (!user) {
//       throw new Error("Invalid user id");
//     }

//     let secure_url: string | undefined;
//     if (profilePicture) {
//       if (user.profilePicture !== null) {
//         await cloudinaryRemove(user.profilePicture);
//       }

//       const uploadResult = await cloudinaryUpload(profilePicture);
//       secure_url = uploadResult.secure_url;
//     }

//     await prisma.user.update({
//       where: { id: userId },
//       data: secure_url ? { ...body, profilePicture: secure_url } : body,
//     });

//     return { message: "Update profile success" };
//   } catch (error) {
//     throw error;
//   }
// };


// interface UpdateProfileBody {
//   fullname: string;
// }

// export const updateUserService = async (
//   body: UpdateProfileBody,
//   profilePicture: Express.Multer.File | undefined,
//   userId: number
// ) => {
//   try {
//     const user = await prisma.user.findFirst({
//       where: { id: userId },
//     });

//     if (!user) {
//       throw new Error("Invalid user id");
//     }

//     let secure_url: string | undefined;
//     if (profilePicture) {
//       if (user.profilePicture !== null) {
//         await cloudinaryRemove(user.profilePicture);
//       }

//       const uploadResult = await cloudinaryUpload(profilePicture);
//       secure_url = uploadResult.secure_url;
//     }

//     await prisma.user.update({
//       where: { id: userId },
//       data: secure_url ? { ...body, profilePicture: secure_url } : body,
//     });

//     return { message: "Update profile success" };
//   } catch (error) {
//     throw error;
//   }
// };


interface UpdateProfileBody {
  fullname: string;
}

export const updateUserService = async (
  body: UpdateProfileBody,
  profilePicture: Express.Multer.File,
  userId: number
) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Invalid user id");
    }

    let secure_url: string | undefined;
    if (profilePicture) {
      if (user.profilePicture !== null) {
        await cloudinaryRemove(user.profilePicture);
      }

      const uploadResult = await cloudinaryUpload(profilePicture);
      secure_url = uploadResult.secure_url;
    }

    await prisma.user.update({
      where: { id: userId },
      data: secure_url ? { ...body, profilePicture: secure_url } : body,
    });

    return { message: "Update profile success" };
  } catch (error) {
    throw error;
  }
};