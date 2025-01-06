import { prisma } from "../../lib/prisma";

export const updateTransactionStatusService = async (

  transactionId: number,
  status: "SUCCESS" | "CANCELED"

) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new Error(`Transaction with id ${transactionId} not found`);
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: status,
      },
    });

    return updatedTransaction;
  } catch (error) {
    throw error;
  }
};
