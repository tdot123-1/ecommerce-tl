"use server";

import { db, QueryResult } from "@vercel/postgres";
import { z } from "zod";
import { Product } from "./types";
import { syncProductWithStripe } from "./stripe";
import { revalidatePath } from "next/cache";

// validate form using zod, specify error messages
const FormSchema = z.object({
  id: z.string(),
  name: z
    .string({
      invalid_type_error: "Please add a name",
    })
    .min(1, { message: "Please add a name" }),
  price: z.coerce
    .number()
    .gte(0, { message: "Please enter an amount of at least 0" })
    .lt(999999, { message: "maximum amount exceeded" })
    .default(0),
  cents: z.coerce
    .number()
    .lt(100, { message: "Please enter an amount between 0 and 99" })
    .gte(0, { message: "Please enter an amount between 0 and 99" })
    .default(0),
  sizes: z
    .string({ invalid_type_error: "Please add available sizes" })
    .min(1, { message: "Please add available sizes" }),
  description: z
    .string({ invalid_type_error: "Please add a description" })
    .min(1, { message: "Please add a description" }),
  category: z
    .string({ invalid_type_error: "Please add a category" })
    .min(1, { message: "Please add a category" }),
  image: z
    .string({ invalid_type_error: "Please add a url path to an image" })
    .min(1, { message: "Please add a url path to an image" }),
});

// create schema for creating a new product, omitting ID since it is created in db
const CreateProduct = FormSchema.omit({ id: true });

// track state of errors to display in UI
export type State = {
  errors?: Record<string, string[]>;
  message?: string | null;
};

export async function createProduct(formData: FormData) {
  // get raw form data
  const rawFormData = Object.fromEntries(formData.entries());

  console.log("FORM: ", rawFormData);

  // validate form fields
  const validatedFields = CreateProduct.safeParse(rawFormData);

  // return message early in case of field errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing data. Error creating new product.",
    };
  }

  // get data from validated fields
  const { name, price, cents, sizes, description, category, image } =
    validatedFields.data;

  // combine submitted price and cents data to get full price in cents
  const formattedPrice = price * 100 + cents;
  console.log("formatted price: ", formattedPrice);

  // establish db connection, return early if connection issues
  let client;

  try {
    client = await db.connect();
  } catch (error) {
    console.error("DB CONNECTION ERROR: ", error);
    return { message: "Failed to connect to db. Please try again later" };
  }

  // begin transaction
  try {
    await client.sql`BEGIN`;

    // create product in db without stripe id's

    const product: QueryResult<Product> = await client.sql`
    INSERT INTO products (name, price, sizes, description, category, image_url)
    VALUES (${name}, ${formattedPrice}, ${sizes}, ${description}, ${category}, ${image})
    RETURNING id, name, price, description, currency, stripe_product_id, stripe_price_id;
    `;

    // get price_id and product_id from stripe api

    const createdProduct = product.rows[0];

    const { stripeProductId, stripePriceId } = await syncProductWithStripe(
      createdProduct
    );

    // insert stripe id's into created product (for payment integration)

    await client.sql`
    UPDATE products
    SET stripe_product_id = ${stripeProductId}, stripe_price_id = ${stripePriceId}
    WHERE id = ${createdProduct.id};`;

    await client.sql`COMMIT`;

    // revalidate path to display newly added product

    revalidatePath("/dashboard/products");

    // return empty string to indicate success
    return {
      message: "",
    };
  } catch (error) {
    // rollback transaction in case of error
    console.error("ERROR CREATING PRODUCT: ", error);

    await client.sql`ROLLBACK`;

    return {
      message: "Database Error: Failed to create product.",
    };
  } finally {
    // release db connection
    client.release();
  }
}
