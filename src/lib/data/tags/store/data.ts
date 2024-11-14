"use server";

import { ITEMS_PER_PAGE } from "@/lib/constants";
import { sql } from "@vercel/postgres";

export const fetchAllActiveTags = async () => {
  // test for skeleton/suspense
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const data = await sql`
        SELECT DISTINCT jsonb_array_elements_text(tags) AS tag
        FROM products
        WHERE is_active = true
      `;

    // console.log(data.rows);

    const tags: string[] = data.rows.map((tag) => tag.tag);

    return tags;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }
};

export const fetchActiveTagsByCategory = async (category: string) => {
  // test for skeleton/suspense
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const data = await sql`
        SELECT DISTINCT jsonb_array_elements_text(tags) AS tag
        FROM products
        WHERE is_active = true
        AND category = ${category}
      `;

    // console.log(data.rows);

    const tags: string[] = data.rows.map((tag) => tag.tag);

    return tags;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }
};

// filter products by tags
export const fetchProductsByTags = async (
  tags: string[],
  currentPage: number
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const normalizedTags = tags.map((tag) => tag.toLowerCase());
  try {
    // test for skeleton/suspense
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    // test for error page
    // throw new Error("test error")

    const data = await sql`
        SELECT id, name, price, sizes, category, image_url 
        FROM products 
        WHERE tags ?| (SELECT array(SELECT jsonb_array_elements_text(${JSON.stringify(normalizedTags)}::jsonb)))
        AND is_active = true
        ORDER BY updated_at DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;

    if (!data.rowCount) {
      return null;
    }

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }
};

// filter products by tags and category
export const fetchProductsByCategoryAndTags = async (
  category: string,
  tags: string[],
  currentPage: number
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const normalizedTags = tags.map((tag) => tag.toLowerCase());

  try {
    const data = await sql`
        SELECT id, name, price, sizes, category, description, image_url, currency, stripe_price_id FROM products 
        WHERE category = ${category}
        AND is_active = true
        AND tags ?| (SELECT array(SELECT jsonb_array_elements_text(${JSON.stringify(normalizedTags)}::jsonb)))
        ORDER BY updated_at DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;

    if (!data.rowCount) {
      return null;
    }

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    //throw new Error("Failed to fetch product.");
    return null;
  }
};

// get total pages for products by tags
