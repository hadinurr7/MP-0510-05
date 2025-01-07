
import { NextFunction, Request, Response } from "express";
import { getTransactionsService } from "../services/transactions/get-transactions-history.service";
import { getTransactionsOrganizerService } from "../services/transactions/get-transactions-org";
import { updateTransactionStatusService } from "../services/transactions/update-transactions.service";
import { uploadPaymentProofService } from "../services/transactions/upload-paymentProof";

export const getTransactionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getTransactionsService({
      page: req.body.page,
      size: req.body.size,
    });

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};


export const getTransactionsOrganizerController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await getTransactionsOrganizerService({
        page: req.body.page,
        size: req.body.size,
      });
  
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  export const updateTransactionStatusController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const transactionId = Number(req.params.id);  
      const { status } = req.body;
      if (!status) {
        throw new Error("Status is required");
      }
      const updatedTransaction = await updateTransactionStatusService(
        transactionId,
        status
      );
  
      res.status(200).send(updatedTransaction);
    } catch (error) {
      next(error);
    }
  };

  // export const uploadPaymentProofController = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const transactionId  = Number(req.params.id)
  //     const paymentProof = req.file;
  
  //     if (!transactionId || !paymentProof) {
  //       return res.status(400).json({ message: "Transaction ID and payment proof are required." });
  //     }
  
  //     const { updatedTransaction = await uploadPaymentProofService({
  //       transactionId,
  //       paymentProof
  //     });
  
  //     res.status(200).json({
  //       message: "Payment proof uploaded successfully",
  //       transaction: updatedTransaction,
  //       payment: \,
  //     });
  //   } catch (error) {
  //     next(error); //
  //   }
  // };







