import { Router } from "express";
import { createEventController, getEventController, getEventsController } from "../controllers/event.controller";
import { uploader } from "../lib/multer";
import { createTransactionController } from "../controllers/transaction.controller";

const router = Router();

router.get("/:id", getEventController);
router.post(
  "/",
  uploader().fields([{ name: "thumbnail", maxCount: 1 }]),
  createTransactionController
);

export default router;
