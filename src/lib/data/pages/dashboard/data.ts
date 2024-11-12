"use server";

import { auth } from "@/auth";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { sql } from "@vercel/postgres";

// FETCH NUMBER OF PAGES FOR ALL PRODUCTS FOR DASHBOARD
export const fetchAllProductsPages = async (): Promise<number> => {
  if (ITEMS_PER_PAGE <= 0) {
    throw new Error("itemsPerPage must be a positive number");
  }

  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    const count = await sql`
      SELECT COUNT(*) FROM products`;

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
