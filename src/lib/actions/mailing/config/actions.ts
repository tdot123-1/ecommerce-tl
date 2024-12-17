"use server";

import { auth } from "@/auth";
import { sql } from "@vercel/postgres";
import { z } from "zod";

const CategoryEnum = z.enum([
  "signin",
  "signup",
  "discount",
  "advertising",
  "other",
]);

const FormSchema = z.object({
  sendgrid_id: z
    .string({
      invalid_type_error: "SendGrid ID must be a string",
    })
    .min(1, { message: "SendGrid ID is required" }),
  name: z
    .string({
      invalid_type_error: "Please add a name",
    })
    .min(3, { message: "Name must be at least 3 characters" })
    .max(25, { message: "Name can be max 25 characters" }),
  category: CategoryEnum,

  dynamic_values: z
    .array(z.string(), {
      invalid_type_error: "Dynamic values must be an array of strings",
    })
    .optional()
    .nullable(),
});

const ChangeMailTemplateSchema = FormSchema.omit({
  sendgrid_id: true,
  category: true,
  dynamic_values: true,
});
export const changeMailTemplate = async (
  formData: FormData,
  category: string
) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const rawFormData = Object.fromEntries(formData.entries());

  console.log("FROM SERVER: ", rawFormData);

  // validate form fields
  const validatedFields = ChangeMailTemplateSchema.safeParse(rawFormData);

  // return message early in case of field errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to change template. Please try again.",
      success: false,
    };
  }

  const { name } = validatedFields.data;

  try {
    const data = await sql`
    WITH unset_current_default AS (
        UPDATE email_templates
        SET is_default = FALSE 
        WHERE category = ${category} 
        AND is_default = TRUE
    )
    UPDATE email_templates
    SET is_default = TRUE
    WHERE name = ${name}
    RETURNING name 
    `;

    if (!data.rowCount) {
      throw new Error("Template name not found");
    }

    return { newDefault: data.rows[0].name, success: true };
  } catch (error) {
    console.error("Error changing template: ", error);

    return {
      message: "Something went wrong, please try again later.",
      success: false,
    };
  }
};
