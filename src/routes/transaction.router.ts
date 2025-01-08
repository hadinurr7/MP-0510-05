import express from "express";
import {
    createTransactionController,
    getTransactionsController,
    getTransactionsOrganizerController,
    updateTransactionStatusController,
    verifyPaymentController,
} from "../controllers/transaction.controller";
import { fileFilter } from "../lib/filefilter";
import { verifyToken } from "../lib/jwt";

import { uploader } from "../lib/multer";

const router = express.Router();

router.get("/", verifyToken, getTransactionsController);

router.get("/organizer", verifyToken, getTransactionsOrganizerController);

router.patch(
  "/update-status/:id",
  verifyToken,
  updateTransactionStatusController
);

router.patch(
  "/:id",
  verifyToken,
  uploader().single("paymentProof"),
  fileFilter
);

router.post("/", createTransactionController);

router.post("/:transactionId/verify", verifyPaymentController);


export default router;
