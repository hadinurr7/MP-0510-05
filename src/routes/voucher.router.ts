import express from "express";
import {
  createVoucherController,
  getVouchersController,
} from "../controllers/voucher.controller";
import { verifyToken } from "../lib/jwt";
import { validateCreateVoucher } from "../vaidator/voucher.validator";

const router = express.Router();

router.get("/", verifyToken, getVouchersController);

router.post(
  "/",
  verifyToken,
  validateCreateVoucher,
  createVoucherController
);

export default router;