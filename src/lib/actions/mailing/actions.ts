"use server";

import { sendMail } from "@/lib/send-email";
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

  console.log("FROM SERVER: ", rawFormData)

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

  try {
    // insert user into db

    // TEST
    const emailInfo = {
      to: email,
      subject: "sendGrid test",
      text: `Hello ${name}, testing if the email automation works. Email intended for ${name}.`,
      html: `<p><strong>Hello ${name}</strong>, testing if the email automation works. Email intended for ${name}.</p>`,
    };
    await sendMail(emailInfo);
    return {
      message: "Email sent!",
    };
  } catch (error) {
    // check for unique email
    console.error("ERROR SENDING EMAIL: ", error);
    return {
      message: "Registration error. Please try again later.",
    };
  }
}
