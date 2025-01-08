
import { NextFunction, Request, Response } from "express";
import { getTransactionsService } from "../services/transactions/get-transactions-history.service";
import { getTransactionsOrganizerService } from "../services/transactions/get-transactions-org";
import { updateTransactionStatusService } from "../services/transactions/update-transactions.service";
import { createTransactionService } from "../services/transactions/create-transaction.service";
import { verifyPaymentService } from "../services/transactions/verify-payment.service";

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

 
 export const createTransactionController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user.id; // Assuming user ID is set in res.locals by authentication middleware
      const { eventId, voucherId, couponId, pointId, qty } = req.body;
      
      const paymentProof = req.file; // Assuming file upload is handled by multer middleware
  
      const transactionData = {
        userId,
        eventId,
        voucherId,
        couponId,
        pointId,
        qty
      };
  
      const result = await createTransactionService(transactionData, paymentProof);
  
      res.status(201).json({
        message: 'Transaction created successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const verifyPaymentController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId = res.locals.user.id; // Assuming user ID is set in res.locals by authentication middleware
      const { transactionId } = req.params;
      const { isApproved } = req.body;
  
      const result = await verifyPaymentService(Number(transactionId), creatorId, isApproved);
  
      res.status(200).json({
        message: isApproved ? 'Payment approved successfully' : 'Payment rejected successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  };

 
 export const createTransactionController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user.id; // Assuming user ID is set in res.locals by authentication middleware
      const { eventId, voucherId, couponId, pointId, qty } = req.body;
      
      const paymentProof = req.file; // Assuming file upload is handled by multer middleware
  
      const transactionData = {
        userId,
        eventId,
        voucherId,
        couponId,
        pointId,
        qty
      };
  
      const result = await createTransactionService(transactionData, paymentProof);
  
      res.status(201).json({
        message: 'Transaction created successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const verifyPaymentController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId = res.locals.user.id; // Assuming user ID is set in res.locals by authentication middleware
      const { transactionId } = req.params;
      const { isApproved } = req.body;
  
      const result = await verifyPaymentService(Number(transactionId), creatorId, isApproved);
  
      res.status(200).json({
        message: isApproved ? 'Payment approved successfully' : 'Payment rejected successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  };
  

  console.log('Transaction controllers created successfully.');