import { sql } from "@vercel/postgres";

export const fetchProducts = async () => {
  try {
    const data = await sql`SELECT * FROM products`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }
};
