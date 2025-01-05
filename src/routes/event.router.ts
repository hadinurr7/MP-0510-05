import { Router } from "express";
import { createEventController, getEventsByUserController, getEventsController } from "../controllers/event.controller";
import { uploader } from "../lib/multer";
import { verifyToken } from "../lib/jwt";

const router = Router();

router.get("/", getEventsController);
router.post(
  "/",
  uploader().fields([{ name: "thumbnail", maxCount: 1 }]),
  createEventController
);

router.get("/byuser", verifyToken,getEventsByUserController);

export default router;
