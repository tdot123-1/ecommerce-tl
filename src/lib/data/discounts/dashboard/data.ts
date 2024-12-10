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
