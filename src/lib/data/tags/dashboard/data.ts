"use server";

import { auth } from "@/auth";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { sql } from "@vercel/postgres";

export const fetchAllProductsAndTagsDashboard = async (currentPage: number) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  console.log("SESSION: ", session.user);
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
