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
  const { fullname, email,phoneNumber, password, referralCode } = body;

  try {
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    
    if (existingUser) {
      throw new Error("Email already exists!");
    }

    const lowerCaseReferralCode = referralCode
      ? referralCode.toLowerCase()
      : null;

    let referrer = null;
    if (lowerCaseReferralCode) {

      referrer = await prisma.user.findUnique({
        where: {
          referralCode: lowerCaseReferralCode,
        },
      });

      if (!referrer) {
        throw new Error("Invalid referral code!");
      }
    }

    const hashedPassword = await hashPassword(password);

    const userReferralCode = generateReferralCode();

    const result = await prisma.$transaction(async (tx) => {

      const newUser = await tx.user.create({
        data: {
          fullname,
          email,
          password: hashedPassword,
          phoneNumber,
          referralCode: userReferralCode,
          totalPoints: 0,
        },
      });

      if (referrer) {
        await tx.referral.create({
          data: { referrerId: referrer.id, referredById: newUser.id },
        });

        const pointsExpiryDate = new Date();
        pointsExpiryDate.setMonth(pointsExpiryDate.getMonth() + 3);

        await tx.point.create({
          data: {
            userId: referrer.id,
            pointEarned: 10000,
            validUntil:new Date(),
            validFrom: pointsExpiryDate,
          },
        });

        await tx.user.update({
          where: { id: referrer.id },
          data: {
            totalPoints: { increment: 10000 },
          },
        });

        const couponExpiryDate = new Date();
        couponExpiryDate.setMonth(couponExpiryDate.getMonth() + 3); 
        const uniqueCouponCode = await generateUniqueCouponCode();

        await tx.coupon.create({
          data: {
            userId: newUser.id,
            code: uniqueCouponCode,
            value: 10000,
            validFrom: new Date(),
            validUntil: couponExpiryDate,
          },
        });
      }

      return newUser;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

export default registerService;
