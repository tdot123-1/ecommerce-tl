import { sql } from "@vercel/postgres";

// fetch all products
export const fetchAllProducts = async () => {
  try {
    // test for skeleton/suspense
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const data = await sql`SELECT * FROM products`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }
};

export const fetchOneProduct = async (productId: string) => {
  try {
    const data = await sql`
      SELECT * FROM products 
      WHERE id = ${productId}`;

    if (!data.rowCount) {
      return null;
    }

    // const product = data.rows.map((item) => ({
    //   ...item,
    //   price: item.price / 100,
    // }));

    // return product[0];

    return data.rows[0]
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product.");
  }
};
