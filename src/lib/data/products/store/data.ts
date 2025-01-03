"use server";

import { ITEMS_PER_PAGE } from "@/lib/constants";
import { Product, ValidationProduct } from "@/lib/types";
import { sql } from "@vercel/postgres";

// FETCH ALL ACTIVE PRODUCTS FOR STORE
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

// FETCH ONE ACTIVE PRODUCT FOR STORE
export const fetchOneActiveProduct = async (productId: string) => {
  try {
    // test for skeleton/suspense
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    const data = await sql`
        SELECT name, price, sizes, category, description, image_url, currency, stripe_price_id, stripe_product_id 
        FROM products 
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

// FETCH ACTIVE PRODUCTS BY CATEGORY FOR STORE
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

// FETCH PRODUCTS TO VALIDATE PRICES IN CART
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

// FETCH FEATURED PRODUCTS FOR STORE
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


// fetch images and names to show on customer receipts
export const fetchPurchaseHistoryProducts = async (
  stripe_product_id_list: string[]
) => {
  try {
    const promises = stripe_product_id_list.map(async (stripe_product_id) => {
      try {
        const result = await sql`
        SELECT name, image_url
        FROM products
        WHERE stripe_product_id = ${stripe_product_id}
      `;

        if (!result.rowCount) {
          throw new Error("Product not found");
        }

        return {
          stripeProductId: stripe_product_id,
          name: result.rows[0].name,
          imageUrl: result.rows[0].image_url,
        };

      } catch (error) {
        console.error(`Error fetch image for: ${stripe_product_id}`, error);
        return {
          stripeProductId: stripe_product_id,
          name: "N/A",
          imageUrl: "/placeholder.png",
        };
      }
    });

    const resolvedProductData = await Promise.all(promises)

    return resolvedProductData

  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }
};
