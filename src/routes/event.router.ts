import { Router } from "express";
import { createEventController, getEventsController } from "../controllers/event.controller";
import { uploader } from "../lib/multer";
import { validateCreateEvent } from "../validator/create.validator";

const router = Router();

router.get("/", getEventsController);
router.post(
  "/",
  uploader().fields([{ name: "thumbnail", maxCount: 1 }]),
  createEventController
);

export default router;
