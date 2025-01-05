import express from "express";
import {
  changePasswordController,
  getUserController,
  getUsersController,
  updateUserController,
} from "../controllers/user.controller";
import { verifyToken } from "../lib/jwt";
import { uploader } from "../lib/multer";
import { fileFilter } from "../lib/filefilter";
import { validateChangePassword, validateUpdateUser } from "../vaidator/user.validator";

const router = express.Router();

router.get("/", getUsersController);

router.get("/profile",verifyToken, getUserController);

router.patch(
  "/profile",
  verifyToken,
  uploader(5).single("profilePicture"),
  fileFilter,
  validateUpdateUser,
  updateUserController,
  
);

router.patch(
  "/change-password",
  verifyToken,
  validateChangePassword,
  changePasswordController
);

export default router;