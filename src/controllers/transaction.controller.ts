// controllers/transaction.controller.ts
import { NextFunction, Request, Response } from "express";
import { createTransactionService } from "../services/transaction/create-transaction.service";
import { verifyPaymentService } from "../services/transaction/verify-payment.service";

export const createTransactionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Ambil file bukti pembayaran jika ada
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    // Validasi input dasar
    const { eventId, qty } = req.body;
    if (!eventId) throw new Error("Event ID is required");
    if (!qty || qty <= 0) throw new Error("Invalid quantity");

    // Ambil userId dari token (asumsi sudah ada middleware auth)
    const userId = Number(req.params.id);
    if (!userId) throw new Error("User not authenticated");

    // Gabungkan data untuk service
    const transactionData = {
      ...req.body,
      userId,
      eventId: Number(eventId),
      qty: Number(qty),
      voucherId: req.body.voucherId ? Number(req.body.voucherId) : undefined,
      couponId: req.body.couponId ? Number(req.body.couponId) : undefined,
      pointId: req.body.pointId ? Number(req.body.pointId) : undefined,
    };

    const result = await createTransactionService(
      transactionData,
      files?.paymentProof?.[0]
    );

    res.status(201).json({
      message: "Transaction created successfully",
      data: {
        transactionId: result.id,
        totalPrice: result.totalPrice,
        status: result.status,
        paymentDeadline: result.paymentDeadline,
        event: {
          id: result.event.id,
          name: result.event.name,
          availableSeats: result.event.availableSeats
        }
      }
    });

  } catch (error) {
    console.error("Create Transaction Error:", error);
    next(error);
  }
};

export const verifyPaymentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { transactionId } = req.params;
    const { isApproved } = req.body;
    const creatorId = Number(req.params.id);

    if (!creatorId) {
      throw new Error("User not authenticated");
    }

    if (typeof isApproved !== 'boolean') {
      throw new Error("isApproved must be a boolean");
    }

    const result = await verifyPaymentService(
      Number(transactionId),
      creatorId,
      isApproved
    );

    res.status(200).json({
      message: isApproved 
        ? "Payment verified successfully" 
        : "Payment rejected",
      data: {
        transactionId: result.id,
        status: result.status,
        event: {
          id: result.event.id,
          name: result.event.name,
          availableSeats: result.event.availableSeats
        }
      }
    });

  } catch (error) {
    console.error("Verify Payment Error:", error);
    next(error);
  }
};