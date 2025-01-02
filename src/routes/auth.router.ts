import { Router } from "express";

import { validateRegister } from "../vaidator/auth.validator";
import { registerController } from "../controllers/auth.controller";

const router = Router();

router.post("/register", validateRegister, registerController);

export default router