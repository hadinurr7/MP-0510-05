
import express from "express";
import {
  getTransactionsController,
  getTransactionsOrganizerController,
  updateTransactionStatusController,
} from "../controllers/transaction.controller";
import { verifyToken } from "../lib/jwt";
import { authorization } from "../lib/auth";

const router = express.Router();

router.get("/", verifyToken, getTransactionsController);

router.get(
  "/organizer",
  verifyToken,
  getTransactionsOrganizerController
);

router.patch(
  "/update-status/:id",
  verifyToken,
  updateTransactionStatusController
);

export default router;
