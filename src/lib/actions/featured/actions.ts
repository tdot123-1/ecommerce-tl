"use server";

import { auth } from "@/auth";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

// TOGGLE FEATURED PRODUCT
export async function toggleFeaturedProduct(
  productId: string,
  isFeatured: boolean,
  isActive: boolean
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // make sure only active products can be added to featured list
  if (!isActive) {
    throw new Error("Product must be active to toggle feature");
  }

  try {
    // if 'isFeatured' is true, product is currently featured -> action should remove product from featured
    if (isFeatured) {
      // remove item from featured_products by product_id
      await sql`
          DELETE FROM featured_products 
          WHERE product_id = ${productId};
        `;
    } else {
      // add item to featured_products by product_id
      await sql`
          INSERT INTO featured_products (product_id)
          VALUES (${productId})
          ON CONFLICT (product_id) DO NOTHING;
        `;
    }

    revalidatePath("/dashboard/products");
    revalidatePath("/dashboard/products/featured");
    revalidatePath("/");
  } catch (error) {
    console.error("FAILED TOGGLE FEATURED PRODUCT: ", error);
    throw new Error("Failed to toggle featured product");
  }
}

// UPDATE FEATURED PRODUCT DATES
export async function setFeaturedDates(
  product_id: string,
  startDate: string,
  endDate: string | null
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  console.log(`START: ${startDate}, END: ${endDate}`);

  try {
    await sql`
      UPDATE featured_products 
      SET start_date = ${startDate}, end_date = ${endDate ?? null}
      WHERE product_id = ${product_id}
      `;

    console.log("DATES UPDATED");
    revalidatePath("/dashboard/products/featured");
    revalidatePath("/");
  } catch (error) {
    console.error("FAILED TO UPDATE DATES: ", error);
    throw new Error("Failed to update dates");
  }
}
