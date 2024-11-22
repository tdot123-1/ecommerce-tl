"use server";

import { generateToken } from "@/lib/customer-auth/token";
import { sendMail } from "@/lib/send-email";
import { createStripeCustomer } from "@/lib/stripe";
import { db } from "@vercel/postgres";
import { z } from "zod";

const FormSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Please add a name",
    })
    .min(3, { message: "Name must be at least 3 characters" })
    .max(25, { message: "Name must can be max 25 characters" }),
  email: z
    .string({
      invalid_type_error: "Please add an email address",
    })
    .min(3, { message: "Email address must be at least 3 characters" })
    .email({ message: "Please add a valid email address" }),
  agree: z
    .string({
      invalid_type_error: "Please indicate agreement",
    })
    .refine((value) => value === "on", {
      message: "You must agree to the terms and conditions",
    }),
});

export async function signUpCustomer(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  console.log("FROM SERVER: ", rawFormData);

  // validate form fields
  const validatedFields = FormSchema.safeParse(rawFormData);

  // return message early in case of field errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to sign up. Please try again.",
    };
  }

  const { name, email } = validatedFields.data;

  // establish db connection, return early if connection issues
  let client;

  try {
    client = await db.connect();
  } catch (error) {
    console.error("DB CONNECTION ERROR: ", error);
    return { message: "Connection error. Please try again later" };
  }

  try {
    // insert user into db
    await client.sql`BEGIN`;

    const createResult = await client.sql`
      INSERT INTO customers (name, email)
      VALUES (${name}, ${email})
      RETURNING id
    `;

    const customerId = createResult.rows[0].id;

    if (!customerId) {
      throw new Error("Failure creating customer in db.");
    }

    // create stripe customer
    const stripe_customer_id = await createStripeCustomer(name, email);

    if (!stripe_customer_id) {
      throw new Error("Failure creating stripe customer.");
    }

    // set stripe_customer_id in db
    const updateResult = await client.sql`
    UPDATE customers
    SET stripe_customer_id = ${stripe_customer_id}
    WHERE id = ${customerId}
    RETURNING id
    `;

    if (!updateResult.rowCount) {
      throw new Error("Failed to update customer with stripe id");
    }

    // customer succesfully added to both stripe and db -> commit
    await client.sql`COMMIT`;

    //(!) generate token
    const token = generateToken(customerId);
    const verificationLink = `${process.env.NEXT_PUBLIC_URL}/verify/${token}`;

    // send email

    // TEST
    const emailInfo = {
      to: email,
      subject: "sendGrid test",
      text: `
      Welcome to Ti'El 

      Hi ${name},
      
      Thanks for signing up. To complete the registration and take advantage of discounts, follow the link below.

      Remember that this link is intended for you alone and should not be shared.

      See you soon!
      Click to complete the verification:

      ${verificationLink}
      `,
      html: `
      <h2>Welcome to Ti'El ${name}</h2> 
      <p>Hi ${name},</p>
      <p>Thanks for signing up. To complete the registration and take advantage of discounts, follow the link below.</p>
      <p>Remember that this link is intended for you alone and should not be shared.</p>
      <p>See you soon!</p>
      <a href=${verificationLink}>Click here to complete the verification</a>
      `,
    };

    await sendMail(emailInfo);

    return {
      message: "Click the link in your email to complete the process!",
    };
  } catch (error) {
    console.error("ERROR ON REGISTRATION: ", error);

    await client.sql`ROLLBACK`;

    // type assertion to access the specific properties of db error
    const dbError = error as {
      code?: string;
      constraint?: string;
      detail?: string;
    };

    // check for unique constraint violation
    if (
      dbError.code === "23505" &&
      dbError.constraint === "customers_email_key"
    ) {
      return {
        message: "Failed to register. Please try again.",
        errors: {
          email: ["This email is already taken. Please use another one."],
        },
      };
    }

    return {
      message: "Registration error. Please try again later.",
    };
  }
}
