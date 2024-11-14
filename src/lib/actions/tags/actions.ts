"use server";

import { auth } from "@/auth";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const updateTags = async (productId: string, newTags: string[]) => {
  // check if user is authorized
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // convert to lowercase
  const normalizedTags = newTags.map((tag) => tag.toLowerCase());

  // convert array to json format
  const newTagsJson = JSON.stringify(normalizedTags);

  // update tags field
  try {
    const result = await sql`
    UPDATE products
    SET tags = ${newTagsJson}::jsonb
    WHERE id = ${productId}
    RETURNING id, category
    `;

    // check if product id was returned -> update was succesful
    if (!result.rowCount) {
      throw new Error("Could not find product.");
    }

    // store category to revalidate path
    const category = result.rows[0].category;

    // revalidate dashboard paths
    revalidatePath("/dashboard/products/tags");
    revalidatePath(`/dashboard/products/tags/edit/${productId}`);

    // revalidate customer paths to show updated tags
    revalidatePath(`/products`);
    revalidatePath(`/products/${productId}`);
    revalidatePath(`/products/categories/${category}`);
  } catch (error) {
    console.error("FAILED to update tags: ", error);
    throw new Error("Database error: failed to update tags");
  }
};
