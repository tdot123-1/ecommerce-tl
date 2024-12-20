"use server";

import { auth } from "@/auth";
import { stripe } from "@/lib/stripe-object";

export const fetchOneCouponData = async (couponId: string) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    const coupon = await stripe.coupons.retrieve(couponId);
    const couponData = {
      id: coupon.id,
      name: coupon.name,
      percent_off: coupon.percent_off,
      redeem_by: coupon.redeem_by,
      max_redemptions: coupon.max_redemptions,
      times_redeemed: coupon.times_redeemed,
      valid: coupon.valid,
    };

    return couponData;
  } catch (error) {
    console.error("Error fetching coupon data:", error);
    throw new Error("Failed to fetch coupon data.");
  }
};

export const fetchAllCouponsAndCodes = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    // fetch all coupons
    const fetchedCoupons = await stripe.coupons.list({ limit: 100 });

    // fetch promo codes for each coupon
    const couponDetails = await Promise.all(
      fetchedCoupons.data.map(async (coupon) => {
        const promoCodes = await stripe.promotionCodes.list({
          coupon: coupon.id,
          limit: 100,
        });

        return {
          coupon: {
            id: coupon.id,
            name: coupon.name,
            percent_off: coupon.percent_off,
            redeem_by: coupon.redeem_by,
            max_redemptions: coupon.max_redemptions,
            times_redeemed: coupon.times_redeemed,
            valid: coupon.valid,
            created: coupon.created,
          },
          promoCodes: promoCodes.data.map((code) => ({
            id: code.id,
            code: code.code,
            max_redemptions: code.max_redemptions,
            times_redeemed: code.times_redeemed,
            active: code.active,
            minimum_amount: code.restrictions.minimum_amount,
            first_time_transaction: code.restrictions.first_time_transaction,
            expires_at: code.expires_at,
            created: code.created,
          })),
        };
      })
    );

    // console.log("COUPON DETAILS: ", couponDetails)
    return couponDetails;
  } catch (error) {
    console.error("Error fetching coupons or promo codes:", error);
    throw new Error("Failed to fetch coupons and promo codes");
  }
};

export const fetchOnePromocodeDataForMail = async (promoCodeId: string) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    console.log("FETCHING: ", promoCodeId)
    const promoCode = await stripe.promotionCodes.retrieve(promoCodeId);
    console.log("PROMO: ", promoCode)
    // const coupon = await stripe.coupons.retrieve(promoCode.id);

    return {
      code: promoCode.code,
      percentOff: promoCode.coupon.percent_off,
      couponName: promoCode.coupon.name,
      maxRedemptions: promoCode.max_redemptions,
      minAmount: promoCode.restrictions.minimum_amount,
      expiresAt: promoCode.expires_at,
    };
  } catch (error) {
    console.error("Error fetching coupon or promo code:", error);
    throw new Error("Failed to fetch coupon or promo code");
  }
};

export const fetchAllActiveCodes = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    const promoCodes = await stripe.promotionCodes.list({
      active: true,
      limit: 100,
    });

    const codesArray = promoCodes.data.map((promo) => ({
      code: promo.code,
      id: promo.id,
    }));
    return codesArray;
  } catch (error) {
    console.error("Error fetching promo codes:", error);
    throw new Error("Failed to fetch promo codes");
  }
};
