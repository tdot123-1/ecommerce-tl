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

// CREATE

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

    const createdProduct: Product | undefined = product.rows[0];

    if (!createdProduct) {
      throw new Error("Failed to create product");
    }

    // get price_id and product_id from stripe api

    const { stripeProductId, stripePriceId } = await syncProductWithStripe(
      createdProduct
    );

    // insert stripe id's into created product (for payment integration)

    await client.sql`
    UPDATE products
    SET stripe_product_id = ${stripeProductId}, stripe_price_id = ${stripePriceId}
    WHERE id = ${createdProduct.id};`;

    await client.sql`COMMIT`;

    // revalidate paths to display newly added product

    revalidatePath("/dashboard/products");
    revalidatePath("/products");
    revalidatePath(`/categories/${category}`);

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

// EDIT

const EditProduct = FormSchema.omit({ id: true });

export async function editProduct(id: string, formData: FormData) {
  // get raw form data
  const rawFormData = Object.fromEntries(formData.entries());

  console.log("FORM: ", rawFormData);
  console.log("ID: ", id);

  // validate form fields
  const validatedFields = EditProduct.safeParse(rawFormData);

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

  let client;

  try {
    client = await db.connect();
  } catch (error) {
    console.error("DB CONNECTION ERROR: ", error);
    return { message: "Failed to connect to db. Please try again later" };
  }

  try {
    await client.sql`BEGIN`;

    const result: QueryResult<Product> = await client.sql`
      UPDATE products
      SET name = ${name}, price = ${formattedPrice}, sizes = ${sizes}, description = ${description}, 
      category = ${category}, image_url = ${image}
      WHERE id = ${id}
      RETURNING id, name, price, description, currency, stripe_product_id, stripe_price_id;
    `;

    console.log("RESULT: ", result.rows[0]);

    const updatedProduct: Product | undefined = result.rows[0];

    if (!updatedProduct) {
      throw new Error("Product not found");
    }

    const { stripeProductId, stripePriceId } = await syncProductWithStripe(
      updatedProduct
    );

    // insert stripe id's into created product (for payment integration)

    await client.sql`
    UPDATE products
    SET stripe_product_id = ${stripeProductId}, stripe_price_id = ${stripePriceId}
    WHERE id = ${updatedProduct.id};`;

    await client.sql`COMMIT`;

    // revalidate paths to display newly updated product

    revalidatePath("/dashboard/products");
    revalidatePath("/products");
    revalidatePath(`/products/${updatedProduct.id}`);
    revalidatePath(`/categories/${category}`);

    // return empty string to indicate success
    return {
      message: "",
    };
  } catch (error) {
    // rollback transaction in case of error
    console.error("ERROR UPDATING PRODUCT: ", error);

    await client.sql`ROLLBACK`;

    return {
      message: "Database Error: Failed to update product.",
    };
  } finally {
    client.release();
  }
}


// DEACTIVATE

export async function deactivateProduct(id: string, activate: boolean) {
  let client;

  try {
    client = await db.connect();
  } catch (error) {
    console.error("DB CONNECTION ERROR: ", error);
    return { message: "Failed to connect to db. Please try again later" };
  }

  try {
    await client.sql`BEGIN`;

    const result = await client.sql`
    UPDATE products
    SET is_active = ${activate}
    WHERE id = ${id}
    RETURNING stripe_product_id
    `

    const stipe_product_id: string | undefined = result.rows[0]


  } catch (error) {
    
  }
}
