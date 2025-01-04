import { prisma } from "../../lib/prisma";
import { hashPassword } from "../../lib/argon";
import { User } from "@prisma/client";

interface RegisterInput
  extends Omit<
    User,
    "id" | "createdAt" | "updatedAt" | "totalPoints" | "referralCode"
  > {
  referralCode?: string;
}

export const OrganizerRegisterService = async (body: RegisterInput) => {
  try {
    const { fullname, email, password, phoneNumber } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (existingUser) {
      throw new Error("Email already exist!");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        fullname,
        phoneNumber,
        email,
        role : "ORGANIZER",
        password: hashedPassword,
      },
    });

    const { password: pw, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};
