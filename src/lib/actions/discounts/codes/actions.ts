"use server";

import { auth } from "@/auth";
import { stripe } from "@/lib/stripe-object";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const FormSchema = z
  .object({
    coupon: z
      .string({
        invalid_type_error: "Please add a coupon",
      })
      .min(1, { message: "Please add a coupon" }),
    code: z
      .string({
        invalid_type_error: "Please add a code",
      })
      .min(3, { message: "Code must be at least 3 characters" })
      .max(35, { message: "Please choose a shorter code" }),
    max_redemptions: z.preprocess(
      (value) => (value === "" || value === undefined ? undefined : value),
      z.coerce.number().int().gte(1).lte(999999).optional()
    ),
    redeem_by: z.preprocess(
      (value) => (value === "" || value === undefined ? undefined : value),
      z.coerce
        .date()
        .optional()
        .refine((date) => !date || date.getTime() > Date.now(), {
          message: "Redeem date must be in the future",
        })
    ),
    min_euros: z.coerce
      .number()
      .gte(0, { message: "Please enter an amount of at least 0" })
      .lt(999999, { message: "maximum amount exceeded" })
      .default(0),
    min_cents: z.coerce
      .number()
      .lt(100, { message: "Please enter an amount between 0 and 99" })
      .gte(0, { message: "Please enter an amount between 0 and 99" })
      .default(0),
    first_time_transaction: z.coerce.boolean().optional(),
    minimum_amount: z.coerce.boolean().optional(),
  })
  .refine(
    (data) =>
      !data.minimum_amount || (data.min_euros >= 1 && data.min_cents >= 0),
    {
      path: ["min_euros"],
      message:
        "If 'Minimum order value' is selected, 'Minimum value in Euro' must be at least 1",
    }
  )
  .refine(
    (data) =>
      data.minimum_amount || (data.min_euros === 0 && data.min_cents === 0),
    {
      path: ["min_euros"],
      message:
        "If 'Minimum order value' is not selected, 'Minimum value in Euro' must be 0",
    }
  );

export async function createPromoCode(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // get raw form data
  const rawFormData = Object.fromEntries(formData.entries());

  console.log("FORM: ", rawFormData);

  // validate form fields
  const validatedFields = FormSchema.safeParse(rawFormData);

  // return message early in case of field errors
  if (!validatedFields.success) {
    console.error("FORM ERRORS: ", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing data. Error creating new promo code.",
    };
  }

  const {
    coupon,
    code,
    max_redemptions,
    redeem_by,
    min_euros,
    min_cents,
    first_time_transaction,
  } = validatedFields.data;

  // combine submitted price and cents data to get full price in cents
  const formattedAmount = min_euros * 100 + min_cents;
  console.log("formatted price: ", formattedAmount);

  try {
    const redeemByTimestamp = redeem_by
      ? new Date(redeem_by).getTime() / 1000
      : undefined;

    const promoCode = await stripe.promotionCodes.create({
      code,
      coupon,
      max_redemptions,
      expires_at: redeemByTimestamp,
      restrictions: {
        first_time_transaction,
        minimum_amount: formattedAmount,
        minimum_amount_currency: "eur",
      },
    });

    revalidatePath("/dashboard/discounts")

    return { success: promoCode.id };
  } catch (error) {
    console.error("Error creating promo code:", error);
    return { message: "Failed to create promo code." };
  }
}
