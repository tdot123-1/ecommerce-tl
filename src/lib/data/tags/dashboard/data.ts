"use server";

import { auth } from "@/auth";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { sql } from "@vercel/postgres";

export const fetchAllProductsAndTagsDashboard = async (currentPage: number) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql`
    SELECT id, name, image_url, tags
    FROM products
    ORDER BY updated_at DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }
};

export const fetchOneProductTagsDashboard = async (productId: string) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    const data = await sql`
    SELECT name, image_url, category, tags
    FROM products
    WHERE id = ${productId}
    `;

    if (!data.rowCount) {
      return null;
    }

    return data.rows[0];

  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
};

export const fetchAllTags = async () => {
  // test for skeleton/suspense
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const data = await sql`
        SELECT DISTINCT jsonb_array_elements_text(tags) AS tag
        FROM products
      `;

    // console.log(data.rows);

    const tags: string[] = data.rows.map((tag) => tag.tag);

    return tags;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }
};
