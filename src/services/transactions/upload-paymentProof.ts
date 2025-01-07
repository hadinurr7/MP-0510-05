import { cloudinaryUpload } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { PaymentStatus, TransactionStatus } from "@prisma/client"; // Mengimpor enum dari Prisma client

interface UploadPaymentProofBody {
  transactionId: number; // ID transaksi yang ingin diupdate
  paymentProof: Express.Multer.File; // Bukti pembayaran yang diupload
}

export const uploadPaymentProofService = async ({
  transactionId,
  paymentProof,
}: UploadPaymentProofBody) => {
  try {
    // Periksa apakah transaksi ada
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      select: {
        payment: true,
        status:true // Mengambil data pembayaran terkait transaksi
      },
    });

    if (!transaction) {
      throw new Error("Transaction not found.");
    }

    if (transaction.status === "FAILED") {
      throw new Error("Transaction has been cancelled. Cannot upload proof.");
    }

    // Mengupload file ke Cloudinary
    const { secure_url } = await cloudinaryUpload(paymentProof);

    // Periksa apakah pembayaran sudah ada atau perlu dibuat
    const payment = transaction.payment[0];
    if (!payment) {
      throw new Error("Payment not found.");
    }

    // Update status pembayaran menjadi 'PENDING' dan simpan bukti pembayaran
    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id }, // Menggunakan ID pembayaran untuk update
      data: {
        paymentProof: secure_url, // Menyimpan URL bukti pembayaran
        paymentStatus: PaymentStatus.PENDING, // Mengubah status pembayaran menjadi 'PENDING'
      },
    });

    // Update status transaksi menjadi 'VERIFYING'
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: TransactionStatus.VERIFYING, // Mengubah status transaksi menjadi 'VERIFYING'
      },
    });

    return { updatedTransaction, updatedPayment }; // Mengembalikan transaksi dan pembayaran yang telah diperbarui
  } catch (error) {
    throw error;
  }
};
