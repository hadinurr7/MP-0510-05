// services/transaction/verify-payment.service.ts
import { TransactionStatus, PaymentStatus } from "@prisma/client";
import prisma from "../../lib/prisma";


export const verifyPaymentService = async (
  transactionId: number,
  creatorId: number,
  isApproved: boolean
) => {
  return await prisma.$transaction(async (tx) => {
    const transaction = await tx.transaction.findUnique({
      where: { id: transactionId },
      include: { 
        event: true,
        payment: true
      }
    });

    if (!transaction) throw new Error('Transaction not found');
    if (transaction.event.userId !== creatorId) {
      throw new Error('Only event creator can verify payments');
    }
    if (transaction.status !== TransactionStatus.VERIFYING) {
      throw new Error('Transaction is not in verification state');
    }

    if (isApproved) {
      await tx.transaction.update({
        where: { id: transactionId },
        data: { status: TransactionStatus.SUCCESS }
      });

      await tx.payment.updateMany({
        where: { transactionId },
        data: { paymentStatus: PaymentStatus.SUCCESS }
      });

      await tx.notification.create({
        data: {
          userId: transaction.userId,
          type: "TRANSACTION",
          message: `Your payment for transaction #${transactionId} has been approved`,
        }
      });
    } else {
      await tx.transaction.update({
        where: { id: transactionId },
        data: { status: TransactionStatus.FAILED }
      });

      await tx.payment.updateMany({
        where: { transactionId },
        data: { paymentStatus: PaymentStatus.FAILED }
      });

      await tx.event.update({
        where: { id: transaction.eventId },
        data: { availableSeats: { increment: transaction.qty } }
      });

      if (transaction.voucherId) {
        await tx.voucher.update({
          where: { id: transaction.voucherId },
          data: { isUsed: false }
        });
      }
      if (transaction.couponId) {
        await tx.coupon.update({
          where: { id: transaction.couponId },
          data: { isUsed: false }
        });
      }

      await tx.notification.create({
        data: {
          userId: transaction.userId,
          type: "TRANSACTION",
          message: `Your payment for transaction #${transactionId} has been rejected`,
        }
      });
    }

    return transaction;
  });
};