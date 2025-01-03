"use server";

import { ITEMS_PER_PAGE } from "@/lib/constants";
import { sql } from "@vercel/postgres";

// FETCH NUMBER OF PAGES FOR ACTIVE PRODUCTS FOR STORE
export const fetchActiveProductsPages = async (
  category?: string | undefined,
  tags?: string[]
): Promise<number> => {
  if (ITEMS_PER_PAGE <= 0) {
    throw new Error("itemsPerPage must be a positive number");
  }

  let normalizedTags;

  if (tags && tags.length > 0) {
    normalizedTags = tags.map((tag) => tag.toLowerCase());
  }

  let count;

  try {
    if (category && tags && tags.length > 0) {
      // const normalizedTags = tags.map((tag) => tag.toLowerCase());

      count = await sql`
        SELECT COUNT(*) FROM products 
        WHERE is_active = true
        AND tags ?| (SELECT array(SELECT jsonb_array_elements_text(${JSON.stringify(
          normalizedTags
        )}::jsonb)))
        AND category = ${category}`;
    } else if (tags && tags.length > 0) {
      // const normalizedTags = tags.map((tag) => tag.toLowerCase());

      count = await sql`
        SELECT COUNT(*) FROM products 
        WHERE is_active = true
        AND tags ?| (SELECT array(SELECT jsonb_array_elements_text(${JSON.stringify(
          normalizedTags
        )}::jsonb)))`;
    } else if (category) {
      count = await sql`
        SELECT COUNT(*) FROM products 
        WHERE is_active = true
        AND category = ${category}`;
    } else {
      count = await sql`
        SELECT COUNT(*) FROM products 
        WHERE is_active = true`;
    }

    // check if count is retrieved successfully
    if (!count.rows.length || count.rows[0].count === null) {
      throw new Error("No product count returned from the database");
    }

    return Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database ERROR: ", error);
    throw new Error("Failed to fetch total number of products");
  }
};
