"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";
import { signIn, signOut } from "../auth";
import { AuthError } from "next-auth";

const FormSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: "Please add a name",
      })
      .min(3, { message: "Name must be at least 3 characters" }),
    email: z
      .string({
        invalid_type_error: "Please add an email address",
      })
      .min(3, { message: "Email address must be at least 3 characters" })
      .email({ message: "Please add a valid email address" }),
    password: z
      .string({
        invalid_type_error: "Please add a password",
      })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirm: z.string({
      invalid_type_error: "Please confirm your password",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

export async function registerUser(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  // validate form fields
  const validatedFields = FormSchema.safeParse(rawFormData);

  // return message early in case of field errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to register. Please try again.",
    };
  }

  const { name, email, password } = validatedFields.data;

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await sql`
    INSERT INTO users (name, email, password)
    VALUES (${name}, ${email}, ${passwordHash})
    `;

    return {
      message: "",
    };
  } catch (error) {
    console.error("ERROR CREATING USER: ", error);

    // type assertion to access the specific properties of db error
    const dbError = error as {
      code?: string;
      constraint?: string;
      detail?: string;
    };

    // check for unique constraint violation
    if (dbError.code === "23505" && dbError.constraint === "users_email_key") {
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

// login
export async function authenticate(formData: FormData) {
  // attempt sign in
  // handle redirect on client
  try {
    await signIn("credentials", {
      redirect: false,
      ...Object.fromEntries(formData),
    });
  } catch (error) {
    console.error("ERROR LOGIN: ", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    } else {
      return "Something went wrong.";
    }
  }
}

export async function logOut() {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    console.error("ERROR LOGOUT: ", error);
    return "Something went wrong.";
  }
}
