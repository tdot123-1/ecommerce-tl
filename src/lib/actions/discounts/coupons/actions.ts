"use server";

import { auth } from "@/auth";
import { stripe } from "@/lib/stripe-object";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const FormSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Please add a name",
    })
    .min(1, { message: "Please add a name" })
    .max(35, { message: "Please choose a shorter name" }),
  percent_off: z.coerce
    .number({
      invalid_type_error: "Percent off must be a number",
    })
    .int("Please enter a whole number")
    .gte(1, { message: "Please enter an number between 1 and 99" })
    .lt(100, { message: "Please enter an number between 1 and 99" }),
  max_redemptions: z.coerce
    .number({ invalid_type_error: "Max redemptions must be a number" })
    .int("Please enter a whole number")
    .gte(1, { message: "Max redemptions must be at least 1" })
    .lte(999999, { message: "Maximum number of redemptions exceeded" })
    .optional(),
  redeem_by: z.coerce
    .date({ message: "Invalid time format" })
    .optional()
    .refine((date) => !date || date.getTime() > Date.now(), {
      message: "Redeem date must be in the future",
    }),
});

// CREATE
export async function createCoupon(formData: FormData) {
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
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing data. Error creating new coupon.",
    };
  }

  const { name, percent_off, max_redemptions, redeem_by } =
    validatedFields.data;

  try {
    const redeemByTimestamp = redeem_by
      ? new Date(redeem_by).getTime() / 1000
      : undefined;

    const coupon = await stripe.coupons.create({
      name,
      percent_off,
      duration: "once",
      max_redemptions,
      redeem_by: redeemByTimestamp,
    });

    revalidatePath("/dashboard/discounts");

    return { success: coupon.id };
  } catch (error) {
    console.error("Error creating coupon: ", error);
    throw new Error("Failed to create coupon");
  }
}
