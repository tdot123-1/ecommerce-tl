"use server";

import { sendMail, sendSignupTemplateMail } from "@/lib/send-email";
import { createStripeCustomer, deleteStripeCustomer } from "@/lib/stripe";
import { db, sql } from "@vercel/postgres";
import { z } from "zod";

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/lib/constants";

const FormSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Please add a name",
    })
    .min(3, { message: "Name must be at least 3 characters" })
    .max(25, { message: "Name can be max 25 characters" }),
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

// (!!) function temporarily closed //////////////////////////////////////////
export async function signUpCustomer(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  console.log(rawFormData);
  return {
    message: "Signup currently not yet possible.",
  };
  //   const rawFormData = Object.fromEntries(formData.entries());

  //   // validate form fields
  //   const validatedFields = FormSchema.safeParse(rawFormData);

  //   // return message early in case of field errors
  //   if (!validatedFields.success) {
  //     return {
  //       errors: validatedFields.error.flatten().fieldErrors,
  //       message: "Failed to sign up. Please try again.",
  //     };
  //   }

  //   const { name, email } = validatedFields.data;

  //   // establish db connection, return early if connection issues
  //   let client;

  //   try {
  //     client = await db.connect();
  //   } catch (error) {
  //     console.error("DB CONNECTION ERROR: ", error);
  //     return { message: "Connection error. Please try again later" };
  //   }

  //   try {
  //     // insert user into db
  //     await client.sql`BEGIN`;

  //     const createResult = await client.sql`
  //       INSERT INTO customers (name, email)
  //       VALUES (${name}, ${email})
  //       RETURNING id
  //     `;

  //     const customerId: string = createResult.rows[0].id;

  //     if (!customerId) {
  //       throw new Error("Failure creating customer in db.");
  //     }

  //     // create stripe customer
  //     const stripe_customer_id = await createStripeCustomer(name, email);

  //     if (!stripe_customer_id) {
  //       throw new Error("Failure creating stripe customer.");
  //     }

  //     // set stripe_customer_id in db
  //     const updateResult = await client.sql`
  //     UPDATE customers
  //     SET stripe_customer_id = ${stripe_customer_id}
  //     WHERE id = ${customerId}
  //     RETURNING id
  //     `;

  //     if (!updateResult.rowCount) {
  //       throw new Error("Failed to update customer with stripe id");
  //     }

  //     const token = jwt.sign({ userId: customerId }, JWT_SECRET!, {
  //       expiresIn: 60 * 30,
  //     });
  //     const verificationLink = `${process.env.NEXT_PUBLIC_URL}/verify/${token}`;

  //     console.log("TOKEN: ", token);
  //     console.log("TOKEN TYPE: ", typeof token);
  //     console.log("LINK: ", verificationLink);

  //     // send email

  //     // TEST
  //     const emailInfo = {
  //       to: email,
  //       subject: "sendGrid test",
  //       text: `
  //       Welcome to Ti'El

  //       Hi ${name},

  //       Thanks for signing up. To complete the registration and take advantage of discounts, follow the link below.

  //       Remember that this link is intended for you alone and should not be shared.

  //       See you soon!
  //       Click to complete the verification:

  //       ${verificationLink}
  //       `,
  //       html: `
  //       <h2>Welcome to Ti'El</h2>
  //       <p>Hi ${name},</p>
  //       <p>Thanks for signing up. To complete the registration and take advantage of discounts, follow the link below.</p>
  //       <p>Remember that this link is intended for you alone and should not be shared.</p>
  //       <p>See you soon!</p>
  //       <a href=${verificationLink}>Click here to complete the verification</a>
  //       `,
  //     };

  //     await sendMail(emailInfo);

  //     // customer succesfully added to both stripe and db -> commit
  //     await client.sql`COMMIT`;

  //     return {
  //       message: "Click the link in your email to complete the process!",
  //     };
  //   } catch (error) {
  //     console.error("ERROR ON REGISTRATION: ", error);

  //     await client.sql`ROLLBACK`;

  //     // type assertion to access the specific properties of db error
  //     const dbError = error as {
  //       code?: string;
  //       constraint?: string;
  //       detail?: string;
  //     };

  //     // check for unique constraint violation
  //     if (
  //       dbError.code === "23505" &&
  //       dbError.constraint === "customers_email_key"
  //     ) {
  //       return {
  //         message: "Failed to register. Please try again.",
  //         errors: {
  //           email: ["This email is already taken. Please use another one."],
  //         },
  //       };
  //     }

  //     return {
  //       message: "Registration error. Please try again later.",
  //     };
  //   } finally {
  //     client.release();
  //   }
}

const VerifyEmail = FormSchema.omit({ name: true, agree: true });

export async function verifyCustomerEmail(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  console.log("FROM SERVER: ", rawFormData);

  // validate form fields
  const validatedFields = VerifyEmail.safeParse(rawFormData);

  // return message early in case of field errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to verify. Please try again.",
    };
  }

  const { email } = validatedFields.data;

  try {
    const data = await sql`
    SELECT id, name
    FROM customers
    WHERE email = ${email}
    `;

    if (!data.rowCount) {
      return {
        message: "Email not found. Please sign up on the 'profile' page",
      };
    }

    const customerId: string = data.rows[0].id;
    const name: string = data.rows[0].name;

    const token = jwt.sign({ userId: customerId }, JWT_SECRET!, {
      expiresIn: 60 * 30,
    });
    const verificationLink = `${process.env.NEXT_PUBLIC_URL}/verify/${token}`;

    const emailInfo = {
      to: email,
      subject: "Signed in",
      text: `
      Signed in to Ti'El

      Hi ${name},
      
      Click the link below to sign in to your Ti'El account.

      Remember that this link is intended for you alone and should not be shared.

      See you soon!
      Click to complete the verification:

      ${verificationLink}
      `,
      html: `
      <h2>Welcome to Ti'El</h2> 
      <p>Hi ${name},</p>
      <p>Click the link below to sign in to your Ti'El account.</p>
      <p>Remember that this link is intended for you alone and should not be shared.</p>
      <p>See you soon!</p>
      <a href=${verificationLink}>Click here to complete the verification</a>
      `,
    };

    await sendMail(emailInfo);

    return {
      message: "Click the link in your email to sign in!",
    };
  } catch (error) {
    console.error("Error signing in: ", error);

    return {
      message: "Something went wrong, please try again later.",
    };
  }
}

export async function signupCustomerWithTemplate(formData: FormData) {
  // DISABLE FUNCTION

  // const rawFormData = Object.fromEntries(formData.entries());
  // console.log(rawFormData);
  // return {
  //   message: "Signup currently not yet possible.",
  //   success: false,
  // };

  const rawFormData = Object.fromEntries(formData.entries());

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

  // create var for stripe id, in case customer needs to be deleted on error
  let stripe_customer_id;

  try {
    // insert user into db
    await client.sql`BEGIN`;

    const createResult = await client.sql`
        INSERT INTO customers (name, email)
        VALUES (${name}, ${email})
        RETURNING id
      `;

    const customerId: string = createResult.rows[0].id;

    if (!customerId) {
      throw new Error("Failure creating customer in db.");
    }

    // create stripe customer
    stripe_customer_id = await createStripeCustomer(name, email);

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

    const token = jwt.sign({ userId: customerId }, JWT_SECRET!, {
      expiresIn: 60 * 30,
    });
    const verificationLink = `${process.env.NEXT_PUBLIC_URL}/verify/${token}`;

    console.log("TOKEN: ", token);
    console.log("TOKEN TYPE: ", typeof token);
    console.log("LINK: ", verificationLink);

    // send email

    // TEST
    // (!) RETRIEVE TEMPLATE AND CODE FROM DB (?) OR .ENV (?) ///////////////

    const data = await client.sql`
    SELECT sendgrid_id, dynamic_values
    FROM email_templates
    WHERE category = 'signup'
    AND is_default = TRUE
    `;

    if (!data.rowCount) {
      throw new Error("No email template found");
    }

    const templateId: string = data.rows[0].sendgrid_id;
    const dynamic_template_data = {
      name: name,
      promoCode: "welcome20",
      verifyLink: verificationLink,
    };

    const emailInfo = {
      to: email,
      dynamic_template_data,
      templateId,
    };

    await sendSignupTemplateMail(emailInfo);

    // customer succesfully added to both stripe and db -> commit
    await client.sql`COMMIT`;

    return {
      message: "Click the link in your email to complete the process!",
      success: true,
    };
  } catch (error) {
    console.error("ERROR ON REGISTRATION: ", error);

    // attempt rollback
    try {
      await client.sql`ROLLBACK`;
    } catch (error) {
      console.error("Rollback failure: ", error);
    }

    // attempt to delete stripe customer
    try {
      // (!) DELETE STRIPE CUSTOMER IF CREATED ////////////////////////////////////
      if (stripe_customer_id) {
        const deletedCustomer = await deleteStripeCustomer(stripe_customer_id);
        console.log("Customer deleted from stripe: ", deletedCustomer.message);
      }
    } catch (error) {
      console.error("Stripe error: ", error);
    }

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
  } finally {
    client.release();
  }
}

// RESEND EMAIL (NEEDS WORK)
export async function resendEmail(email: string) {
  try {
    const data = await sql`
    SELECT id, name 
    FROM customers
    WHERE email = ${email}
    `;

    if (!data.rowCount) {
      throw new Error("Customer email not found");
    }

    const name = data.rows[0].name;
    const customerId = data.rows[0].id;

    const token = jwt.sign({ userId: customerId }, JWT_SECRET!, {
      expiresIn: 60 * 30,
    });
    const verificationLink = `${process.env.NEXT_PUBLIC_URL}/verify/${token}`;

    console.log("TOKEN: ", token);
    console.log("TOKEN TYPE: ", typeof token);
    console.log("LINK: ", verificationLink);

    // send email

    // TEST
    // (!) RETRIEVE TEMPLATE AND CODE FROM DB (?) OR .ENV (?) ///////////////
    const emailData = await sql`
    SELECT sendgrid_id, dynamic_values
    FROM email_templates
    WHERE category = 'signup'
    AND is_default = TRUE
    `;

    if (!emailData.rowCount) {
      throw new Error("No email template found");
    }

    const templateId: string = emailData.rows[0].sendgrid_id;
    const dynamic_template_data = {
      name: name,
      promoCode: "welcome20",
      verifyLink: verificationLink,
    };

    const emailInfo = {
      to: email,
      dynamic_template_data,
      templateId,
    };

    await sendSignupTemplateMail(emailInfo);

    return { success: true };
  } catch (error) {
    console.error("Error resending email: ", error);
    throw new Error("Failed to resend email");
  }
}
