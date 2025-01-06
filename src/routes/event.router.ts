import { Router } from "express";
import { createEventController, getEventController, getEventsController } from "../controllers/event.controller";
import { uploader } from "../lib/multer";

const router = Router();

router.get("/", getEventsController);
router.get("/:id", getEventController);
router.post(
  "/",
  uploader().fields([{ name: "thumbnail", maxCount: 1 }]),
  createEventController
);

export default router;
