import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { BASE_URL_FE, JWT_SECRET_FORGOT_PASSWORD } from "../../config";
import { prisma } from "../../lib/prisma";
import { transporter } from "../../lib/nodemailer";
import { resetPasswordEmail } from "../../lib/email";

export const forgotPasswordService = async (body: Pick<User, "email">) => {
  try {
    const { email } = body;

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email address");
    }

    const token = sign({ id: user.id }, JWT_SECRET_FORGOT_PASSWORD!, {
      expiresIn: "15m",
    });

    const resetUrl = `${BASE_URL_FE}/reset-password/${token}`;

    const emailHtml = resetPasswordEmail(user.fullname, resetUrl);

    await transporter.sendMail({
      to: email,
      subject: "Link Reset Password",
      html: emailHtml,
    });

    return { message: "Email sent successfully" };
  } catch (error) {
    throw error;
  }
};
