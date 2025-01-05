import { NextFunction, Request, Response } from "express";
import { getUserService } from "../services/user/get-user.service";
import { getUsersService } from "../services/user/get-users.service";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { updateUserService } from "../services/user/update-user.service";
import { prisma } from "../lib/prisma";
import { changePasswordService } from "../services/user/change-password.service";


export const getUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getUsersService();

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    // console.log(req.headers, "ini headers");
    const token = req.headers.authorization?.replace("Bearer ","") || "" 
    // console.log("ini token:" token,);

    const decoded = verify (token, JWT_SECRET!) as {id : number}
    // console.log(decoded, "ini decoded");
    
    const id = Number(req.params.id);
    const result = await getUserService(decoded.id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};


// export const updateUserController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     if (!JWT_SECRET) {
//       throw new Error("JWT_SECRET is not defined");
//     }

//     // Mendapatkan dan memverifikasi token
//     const token = req.headers.authorization?.replace("Bearer ", "") || "";
//     console.log("token :", token);
    
//     const decoded = verify(token, JWT_SECRET!) as { id: number };
// console.log("decoded:", decoded);

//     // Mendapatkan file dan data user
//     const profilePicture = req.file as Express.Multer.File;
//     const userId = res.locals.user?.id;

//     if (!userId) {
//       throw new Error("User ID not found in res.locals");
//     }

//     // Memastikan req.body memiliki struktur yang valid
//     const body = req.body;

//     // Memperbarui data user
//     const result = await updateUserService(userId, profilePicture, body);

//     // Mengirimkan respons sukses
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };


// controllers/updateUser.controller.ts

// controllers/updateUser.controller.ts


export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    // console.log(req.headers, "ini headers");
    const token = req.headers.authorization?.replace("Bearer ","") || "" 
    // console.log("ini token:" token,);

    const decoded = verify (token, JWT_SECRET!) as {id : number}
    // console.log(decoded, "ini decoded");

    if (!decoded || !decoded.id) {
      res.status(401).send({message: "token payload invalid" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true }
    });

    if (!user) {
      res.status(401).send({message: "User not found" });
      return;
    }
    const files = req.files as { [fieldName: string]: Express.Multer.File[] };

    const result = await updateUserService(
      req.body,
      files?.profilePicture?.[0],
      user.id
    );
    res.status(200).send(result);
  } catch (error) {
    next(error)
  }
};

export const changePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(res.locals.user.id);
    const body = req.body;
    const result = await changePasswordService(userId, body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};