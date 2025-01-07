import { Router } from "express";

import { createEventController, getEventsByUserController, getEventsController, getEventController, updateEventController } from "../controllers/event.controller";
import { uploader } from "../lib/multer";
import { verifyToken } from "../lib/jwt";
import { fileFilter } from "../lib/filefilter";
import { validateUpdateEvent } from "../vaidator/update-event.validator";

const router = Router();

router.get("/", getEventsController);

router.get("/:id", getEventController);
router.post(
  "/",
  uploader().fields([{ name: "thumbnail", maxCount: 1 }]),
  createEventController
);

router.put(
  "/:id",
  verifyToken,
  uploader().fields([{ name: "thumbnail", maxCount: 1 }]),
  fileFilter,
  validateUpdateEvent,
  updateEventController
);

router.get("/byuser", verifyToken,getEventsByUserController);

export default router;
