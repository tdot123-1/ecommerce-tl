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
    await new Promise((resolve) => setTimeout(resolve, 5000));

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
      SELECT
        p.id, 
        p.name,
        p.price,
        p.image_url
      FROM 
        products p
      JOIN 
        featured_products f ON p.id = f.product_id
      WHERE 
        p.is_active = true
      ORDER BY 
        f.start_date DESC
      LIMIT 6
      `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }
};

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

export const fetchAllProductsImages = async (currentPage: number) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // test for skeleton/suspense
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const data = await sql`
      SELECT
        p.id AS product_id,
        p.name AS product_name,
        p.image_url AS product_image_url,
        ARRAY_AGG(pi.image_url) AS additional_image_urls
      FROM 
        products p
      LEFT JOIN 
        product_images pi ON p.id = pi.product_id
      GROUP BY
        p.id, p.name, p.image_url
      ORDER BY 
        p.updated_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }
};

export const fetchOneProductImagesDashboard = async (productId: string) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    const data = await sql`
    SELECT 
      p.name AS product_name,
      p.image_url AS product_image_url,
      JSON_AGG(
          JSON_BUILD_OBJECT(
              'image_id', pi.id,
              'image_url', pi.image_url,
              'display_order', pi.display_order,
              'created_at', pi.created_at
          )
          ORDER BY pi.display_order 
      ) AS additional_images
    FROM 
      products p
    LEFT JOIN 
      product_images pi ON p.id = pi.product_id
    WHERE 
      p.id = ${productId}
    GROUP BY 
      p.id
    LIMIT 1
    `;

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

export const fetchOneProductImages = async (productId: string) => {
  try {
    const data = await sql`
    SELECT image_url 
    FROM product_images
    WHERE product_id = ${productId}
    ORDER BY display_order
    `;

    return data.rows.length ? data.rows : [];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch images.");
  }
};
