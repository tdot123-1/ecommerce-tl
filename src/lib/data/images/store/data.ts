"use server";

import { sql } from "@vercel/postgres";

// FETCH SECONDARY IMAGES OF ONE PRODUCT FOR STORE
export const fetchOneProductImages = async (productId: string) => {
  try {
    const data = await sql`
      SELECT image_url 
      FROM product_images
      WHERE product_id = ${productId}
      ORDER BY display_order
      `;

    return data.rows.length ? data.rows : [];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch images.");
  }
};
