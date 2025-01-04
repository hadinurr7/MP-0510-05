import { Router } from "express";
import {
  forgotPasswordController,
  loginController,
  organizerRegisterController,
  registerController,
  resetPasswordController,
} from "../controllers/auth.controller";
import { verifyTokenReset } from "../lib/jwt";
import { validateForgotPassword, validateLogin, validateRegister, validateResetPassword } from "../vaidator/auth.validator";

const router = Router();

router.post("/register", validateRegister, registerController);
router.post("/organizer",validateRegister, organizerRegisterController)
router.post("/login", validateLogin, loginController);
router.post(
  "/forgot-password",
  validateForgotPassword,
  forgotPasswordController
);
router.patch(
  "/reset-password",
  verifyTokenReset,
  validateResetPassword,
  resetPasswordController
);

export default router;
