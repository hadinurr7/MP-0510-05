
import express from "express";
import {
  getTransactionsController,
  getTransactionsOrganizerController,
  updateTransactionStatusController,
  // uploadPaymentProofController,
} from "../controllers/transaction.controller";
import { verifyToken } from "../lib/jwt";
import { fileFilter } from "../lib/filefilter";
import { uploader } from "../lib/multer";

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

router.patch(
  "/:id",
  verifyToken,
  uploader().single("paymentProof"),
  fileFilter,
  // uploadPaymentProofController
);

export default router;
