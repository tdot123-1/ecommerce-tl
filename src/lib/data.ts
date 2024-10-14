import { sql } from "@vercel/postgres";

// fetch all products
export const fetchAllProducts = async () => {
  try {
    // test for skeleton/suspense
    //await new Promise((resolve) => setTimeout(resolve, 5000));

    // test for error page
    // throw new Error("test error")

    const data =
      await sql`SELECT id, name, price, sizes, category, image_url FROM products`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }
};

export const fetchOneProduct = async (productId: string) => {
  try {

    // test for skeleton/suspense
    await new Promise((resolve) => setTimeout(resolve, 5000));


    const data = await sql`
      SELECT name, price, sizes, category, description, image_url, currency, stripe_price_id FROM products 
      WHERE id = ${productId}`;

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


export const fetchProductsByCategory = async (category: string) => {
  try {
    const data = await sql`
      SELECT name, price, sizes, category, description, image_url, currency, stripe_price_id FROM products 
      WHERE category = ${category}`;

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


// need to get items in cart from db to validate prices
// needs testing
export const fetchPriceValidationProducts = async (productIds: string[]) => {
  try {
    const data = await sql`
    SELECT id, name, price, stripe_price_id
    FROM products
    WHERE id IN (${productIds.join(", ")});
    `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product.");
  }
};
