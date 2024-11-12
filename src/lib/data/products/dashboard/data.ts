"use server";

import { auth } from "@/auth";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { EditableProduct } from "@/lib/types";
import { sql } from "@vercel/postgres";

// FETCH ALL PRODUCTS FOR DASHBOARD
export const fetchAllProducts = async (currentPage: number) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    // test for skeleton/suspense
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    // test for error page
    // throw new Error("test error")

    const data = await sql`
    SELECT 
    p.id,
    p.name,
    p.price,
    p.sizes,
    p.category,
    p.image_url,
    p.is_active,
    CASE WHEN fp.product_id IS NOT NULL THEN true ELSE false END AS is_featured
    FROM products p
    LEFT JOIN featured_products fp ON p.id = fp.product_id
    ORDER BY p.updated_at DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }
};

// FETCH ONE PRODUCT FOR DASHBOARD
export const fetchOneProduct = async (productId: string) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    // test for skeleton/suspense
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    const data = await sql`
        SELECT name, price, sizes, category, description, image_url, currency, stripe_price_id FROM products 
        WHERE id = ${productId}`;

    if (!data.rowCount) {
      return null;
    }

    const product: EditableProduct = {
      id: productId,
      name: data.rows[0].name,
      price: data.rows[0].price,
      sizes: data.rows[0].sizes,
      category: data.rows[0].category,
      description: data.rows[0].description,
      image_url: data.rows[0].image_url,
      currency: data.rows[0].currency,
      stripe_price_id: data.rows[0].stripe_price_id,
    };

    return product;
  } catch (error) {
    console.error("Database Error:", error);
    //throw new Error("Failed to fetch product.");
    return null;
  }
};

// FETCH FEATURED PRODUCTS FOR DASHBOARD
export const fetchFeaturedProductsDashboard = async () => {
  try {
    const data = await sql`
      SELECT fp.id AS featured_id,
      fp.start_date,
      fp.end_date,
      fp.product_id,
      p.name,
      p.image_url
      FROM featured_products fp
      JOIN products p ON fp.product_id = p.id
      ORDER BY fp.start_date DESC;
      `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch featured product data.");
  }
};
