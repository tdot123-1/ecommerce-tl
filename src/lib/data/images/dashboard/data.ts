"use server";

import { auth } from "@/auth";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { sql } from "@vercel/postgres";

// FETCH ALL PRODUCTS WITH SECONDARY IMAGES FOR DASHBOARD
export const fetchAllProductsImages = async (currentPage: number) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // test for skeleton/suspense
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const data = await sql`
        SELECT
          p.id AS product_id,
          p.name AS product_name,
          p.image_url AS product_image_url,
          ARRAY_AGG(pi.image_url) AS additional_image_urls
        FROM 
          products p
        LEFT JOIN 
          product_images pi ON p.id = pi.product_id
        GROUP BY
          p.id, p.name, p.image_url
        ORDER BY 
          p.updated_at DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }
};

// FETCH ALL SECONDARY IMAGES AND ADDITIONAL INFO FOR DASHBOARD
export const fetchOneProductImagesDashboard = async (productId: string) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    const data = await sql`
      SELECT 
        p.name AS product_name,
        p.image_url AS product_image_url,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'image_id', pi.id,
                'image_url', pi.image_url,
                'display_order', pi.display_order,
                'created_at', pi.created_at
            )
            ORDER BY pi.display_order 
        ) AS additional_images
      FROM 
        products p
      LEFT JOIN 
        product_images pi ON p.id = pi.product_id
      WHERE 
        p.id = ${productId}
      GROUP BY 
        p.id
      LIMIT 1
      `;

    if (!data.rowCount) {
      return null;
    }

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    //throw new Error("Failed to fetch product.");
    return null;
  }
};
