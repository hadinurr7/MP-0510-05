import { Router } from "express";
import { verifyToken } from "../lib/jwt";
import { getAttendeesByEventController } from "../controllers/attendee.controller";
import { authorization } from "../lib/auth";

const router = Router();

router.get(
  "/:eventId/:id",
  verifyToken,
  getAttendeesByEventController
);

export default router;