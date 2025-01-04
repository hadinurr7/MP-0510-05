import { User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { hashPassword } from "../../lib/argon";
import { generateReferralCode } from "../../lib/referral";
import { generateUniqueCouponCode } from "../../lib/coupon";

interface RegisterInput
  extends Omit<
    User,
    "id" | "createdAt" | "updatedAt" | "totalPoints" | "referralCode"
  > {
  referralCode?: string;
}

export const registerService = async (body: RegisterInput) => {
  try {
    const { fullname, email, password, phoneNumber, referralCode } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (existingUser) {
      throw new Error("Email already exist!");
    }
    const normalizedReferralCode = referralCode
      ? referralCode.toLowerCase()
      : null;

    let referrer = null;
    if (normalizedReferralCode) {
      referrer = await prisma.user.findUnique({
        where: {
          referralCode: normalizedReferralCode,
        },
      });

      if (!referrer) {
        throw new Error("Invalid referral code!");
      }
    }

    const hashedPassword = await hashPassword(password);
    const userReferralCode = generateReferralCode();

    const newUser = await prisma.user.create({
      data: {
        fullname,
        phoneNumber,
        email,
        password: hashedPassword,
        referralCode: userReferralCode,
      },
    });
    if (referrer) {
      await prisma.referral.create({
        data: { referrerId: referrer.id, referredById: newUser.id },
      });

      const pointsExpiryDate = new Date();
      pointsExpiryDate.setMonth(pointsExpiryDate.getMonth() + 3);

      await prisma.point.create({
        data: {
          userId: referrer.id,
          pointEarned: 10000,
          validFrom: new Date(),
          validUntil: pointsExpiryDate,
        },
      });

      const couponExpiryDate = new Date();
      couponExpiryDate.setMonth(couponExpiryDate.getMonth() + 3);
      const uniqueCouponCode = await generateUniqueCouponCode();

      await prisma.coupon.create({
        data: {
          userId: newUser.id,
          code: uniqueCouponCode,
          value: 10000,
          validFrom: new Date(),
          validUntil: couponExpiryDate,
        },
      });
    }
    const { password: pw, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};
