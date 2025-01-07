import { transporter } from "../../lib/nodemailer";
import { prisma } from "../../lib/prisma";

export const updateTransactionStatusService = async (
  transactionId: number,
  status: "SUCCESS" | "FAILED" | "WAITING" | "FAILED"
) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: {
        user: true,
      },
    });

    if (!transaction) {
      throw new Error(`Transaction with id ${transactionId} not found`);
    }

    if (transaction.status !== "WAITING" && transaction.status !== "VERIFYING") {
      throw new Error(`Cannot update status of transaction in current state: ${transaction.status}`);
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: status,
      },
    });

	const user = await prisma.user.findFirst({
		where: {
			id: updatedTransaction.userId
		}
	})

	await transporter.sendMail({
		  to: user?.email,
		  subject: status === 'SUCCESS' ? 'Transaksi Sukses' : 'Transaksi Di reject',
		  html: status === 'SUCCESS' ? 'Anda telah behasil' : 'Anda Telah gagal',
		});

    return { updatedTransaction, name: transaction.user.fullname };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};
