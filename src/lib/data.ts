"use server";

import { sql } from "@vercel/postgres";
import { EditableProduct, Product, ValidationProduct } from "./types";
import { auth } from "@/auth";

const ITEMS_PER_PAGE = 8;

// fetch all products
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
      SELECT id, name, price, sizes, category, image_url, is_active 
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

export const fetchActiveProducts = async (currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    // test for skeleton/suspense
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    // test for error page
    // throw new Error("test error")

    const data = await sql`
      SELECT id, name, price, sizes, category, image_url 
      FROM products 
      WHERE is_active = true
      ORDER BY updated_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }
};

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

export const fetchOneActiveProduct = async (productId: string) => {
  try {
    // test for skeleton/suspense
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    const data = await sql`
      SELECT name, price, sizes, category, description, image_url, currency, stripe_price_id, stripe_product_id FROM products 
      WHERE id = ${productId}
      AND is_active = true`;

    if (!data.rowCount) {
      return null;
    }

    const product: Product = {
      id: productId,
      name: data.rows[0].name,
      price: data.rows[0].price,
      sizes: data.rows[0].sizes,
      category: data.rows[0].category,
      description: data.rows[0].description,
      image_url: data.rows[0].image_url,
      currency: data.rows[0].currency,
      stripe_price_id: data.rows[0].stripe_price_id,
      stripe_product_id: data.rows[0].stripe_product_id,
    };

    return product;
  } catch (error) {
    console.error("Database Error:", error);
    //throw new Error("Failed to fetch product.");
    return null;
  }
};

export const fetchProductsByCategory = async (
  category: string,
  currentPage: number
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql`
      SELECT id, name, price, sizes, category, description, image_url, currency, stripe_price_id FROM products 
      WHERE category = ${category}
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
    //throw new Error("Failed to fetch product.");
    return null;
  }
};

// need to get items in cart from db to validate prices
// needs testing
export const fetchPriceValidationProducts = async (): Promise<
  ValidationProduct[]
> => {
  try {
    const data = await sql`
    SELECT id, stripe_price_id, stripe_product_id
    FROM products
    WHERE is_active = TRUE;
    `;

    return data.rows as ValidationProduct[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products");
  }
};

export const fetchActiveProductsPages = async (
  category?: string | undefined
): Promise<number> => {
  if (ITEMS_PER_PAGE <= 0) {
    throw new Error("itemsPerPage must be a positive number");
  }

  let count;

  try {
    if (category) {
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

export const fetchFeaturedProducts = async () => {
  try {
    const data = await sql`
      SELECT id, name, price, image_url 
      FROM products 
      WHERE is_active = true
      ORDER BY updated_at DESC
      LIMIT 5
      `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }
};
