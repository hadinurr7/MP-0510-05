// services/transaction/create-transaction.service.ts
import { TransactionStatus, PaymentStatus } from "@prisma/client";
import { addHours } from "date-fns";
import prisma from "../../lib/prisma";


interface CreateTransactionBody {
  userId: number;
  eventId: number;
  voucherId?: number;
  couponId?: number;
  pointId: number;
  qty: number;
}

export const createTransactionService = async (
  body: CreateTransactionBody,
  paymentProof?: Express.Multer.File
) => {
  try {
    const { userId, eventId, voucherId, couponId, pointId, qty } = body;

    return await prisma.$transaction(async (tx) => {
      const event = await tx.event.findUnique({
        where: { id: eventId },
        include: {
          User: true
        }
      });

      if (!event) throw new Error('Event not found');
      if (event.availableSeats < qty) throw new Error('Not enough available seats');

      let totalPrice = event.price * qty;

      // 2. Validate and apply voucher if provided
      if (voucherId) {
        const voucher = await tx.voucher.findUnique({
          where: { 
            id: voucherId,
            isUsed: false,
            validUntil: {
              gte: new Date()
            }
          }
        });

        if (!voucher) throw new Error('Invalid or expired voucher');
        totalPrice -= voucher.value;

        await tx.voucher.update({
          where: { id: voucherId },
          data: { isUsed: true }
        });
      }

      // 3. Validate and apply coupon if provided
      if (couponId) {
        const coupon = await tx.coupon.findUnique({
          where: { 
            id: couponId,
            isUsed: false,
            validUntil: {
              gte: new Date()
            }
          }
        });

        if (!coupon) throw new Error('Invalid or expired coupon');
        totalPrice -= coupon.value;

        await tx.coupon.update({
          where: { id: couponId },
          data: { isUsed: true }
        });
      }

      totalPrice = Math.max(totalPrice, 0);

      // 4. Create transaction
      const transaction = await tx.transaction.create({
        data: {
          userId,
          eventId,
          voucherId,
          couponId,
          pointId,
          totalPrice,
          qty,
          status: TransactionStatus.WAITING,
        },
        include: {
          event: true,
          user: true
        }
      });

      // 5. Create payment record
      const paymentDeadline = addHours(new Date(), 2);
      await tx.payment.create({
        data: {
          transactionId: transaction.id,
          amount: totalPrice,
          paymentStatus: PaymentStatus.PENDING,
          paymentMethod: "BANK_TRANSFER",
          paymentProof: paymentProof?.filename || "",
        }
      });

      // 6. Reserve seats
      await tx.event.update({
        where: { id: eventId },
        data: { 
          availableSeats: { decrement: qty }
        }
      });

      // 7. Set payment deadline timer
      setTimeout(async () => {
        try {
          const checkTransaction = await prisma.transaction.findUnique({
            where: { id: transaction.id },
            include: { payment: true }
          });

          if (checkTransaction?.status === TransactionStatus.WAITING) {
            await prisma.$transaction(async (ptx) => {
              // Check current seats availability
              const currentEvent = await ptx.event.findUnique({
                where: { id: eventId }
              });

              if (!currentEvent || currentEvent.availableSeats < qty) {
                // Mark as failed if seats no longer available
                await ptx.transaction.update({
                  where: { id: transaction.id },
                  data: { status: TransactionStatus.FAILED }
                });

                await ptx.payment.updateMany({
                  where: { transactionId: transaction.id },
                  data: { paymentStatus: PaymentStatus.FAILED }
                });

                // Return voucher and coupon
                if (voucherId) {
                  await ptx.voucher.update({
                    where: { id: voucherId },
                    data: { isUsed: false }
                  });
                }
                if (couponId) {
                  await ptx.coupon.update({
                    where: { id: couponId },
                    data: { isUsed: false }
                  });
                }
              } else {
                // Return seats and mark as failed
                await ptx.event.update({
                  where: { id: eventId },
                  data: { availableSeats: { increment: qty } }
                });

                await ptx.transaction.update({
                  where: { id: transaction.id },
                  data: { status: TransactionStatus.FAILED }
                });

                await ptx.payment.updateMany({
                  where: { transactionId: transaction.id },
                  data: { paymentStatus: PaymentStatus.FAILED }
                });

                // Return voucher and coupon
                if (voucherId) {
                  await ptx.voucher.update({
                    where: { id: voucherId },
                    data: { isUsed: false }
                  });
                }
                if (couponId) {
                  await ptx.coupon.update({
                    where: { id: couponId },
                    data: { isUsed: false }
                  });
                }
              }
            });
          }
        } catch (error) {
          console.error("Payment deadline check error:", error);
        }
      }, 2 * 60 * 60 * 1000); // 2 hours

      // 8. Create notification for event creator
      await tx.notification.create({
        data: {
          userId: event.userId,
          type: "TRANSACTION",
          message: `New transaction #${transaction.id} needs verification`,
        }
      });

      return {
        ...transaction,
        paymentDeadline
      };
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};