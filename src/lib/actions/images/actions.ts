"use server";

import { auth } from "@/auth";
import { del } from "@vercel/blob";
import { db, sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

// DELETE BLOB FROM STORE
export async function deleteImageFromStore(blobUrl: string) {
  const session = await auth();

  // throw new Error("test")

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    await del(blobUrl);
    console.log("IMAGE DELETED SUCCESSFULLY");
  } catch (error) {
    console.error("FAILED TO DELETE IMAGE: ", error);
    throw new Error("Failed to delete image");
  }
}

// ADD SECONDARY IMAGE TO PRODUCT
export const addProductImage = async (productId: string, url: string) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    await sql`
      INSERT INTO product_images (product_id, image_url)
      VALUES (${productId}, ${url})
      `;

    console.log("IMAGE ADDED");

    revalidatePath(`/dashboard/products/images/edit/${productId}`);
    revalidatePath(`/products/${productId}`);
    revalidatePath(`/dashboard/products/images`);
  } catch (error) {
    console.error("FAILED TO add image: ", error);
    throw new Error("Failed to add image");
  }
};

// UPDATE DISPLAY ORDER OF SECONDARY IMAGE
export const changeDisplayOrder = async (
  imageId: string,
  productId: string,
  formData: FormData
) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const position = formData.get("position");

  const positionInt = Number(position);

  if (typeof positionInt !== "number" || positionInt < 1 || positionInt > 99) {
    return "Please submit a number between 1 and 99.";
  }

  try {
    await sql`
      UPDATE product_images
      SET display_order = ${positionInt}
      WHERE id = ${imageId}
      `;

    revalidatePath(`/dashboard/products/images/edit/${productId}`);
    revalidatePath(`/products/${productId}`);
    revalidatePath(`/dashboard/products/images`);

    return "";
  } catch (error) {
    console.error("FAILED TO update display order: ", error);
    throw new Error("Failed to update display order");
  }
};

// SWAP PRIMARY FOR SECONDARY IMAGE
export const swapPrimaryImage = async (
  product_id: string,
  image_id: string,
  primary_url: string,
  secondary_url: string
) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  let client;
  try {
    client = await db.connect();
  } catch (error) {
    console.error("DB CONNECTION ERROR: ", error);
    return { message: "Failed to connect to db. Please try again later" };
  }

  if (!client) {
    return { message: "Failed to connect to db. Please try again later" };
  }

  try {
    await client.sql`BEGIN`;

    // set new url for primary image
    const result = await client.sql`
      UPDATE products 
      SET image_url = ${secondary_url}
      WHERE id = ${product_id}
      RETURNING category
      `;

    if (result.rowCount === 0) {
      throw new Error("Product not found.");
    }

    // store product's category for revalidating that path
    const category = result.rows[0].category;

    // store the previously primary image in the 'product_images' table
    await client.sql`
      INSERT INTO product_images (image_url, product_id)
      VALUES (${primary_url}, ${product_id})
      ON CONFLICT (image_url) DO NOTHING
      `;

    // delete the previously secondary image from 'product_images' table
    const deleteResult = await client.sql`
      DELETE FROM product_images 
      WHERE id = ${image_id}
      RETURNING id;
      `;

    if (deleteResult.rowCount === 0) {
      throw new Error(
        "Failed to delete the secondary image. Image not found or mismatch."
      );
    }

    await client.sql`COMMIT`;

    revalidatePath(`/dashboard/products/images/edit/${product_id}`);
    revalidatePath(`/dashboard/products/images`);
    revalidatePath(`/products`);
    revalidatePath(`/products/${product_id}`);
    revalidatePath(`/products/categories/${category}`);

    return { message: "" };
  } catch (error) {
    // rollback transaction in case of error
    console.error("ERROR UPDATING PRODUCT: ", error);

    await client.sql`ROLLBACK`;

    return {
      message: "Database Error: Failed to update product image.",
    };
  } finally {
    client.release();
  }
};

// DELETE SECONDARY IMAGE FROM DB AND BLOB STORE
export const deleteSecondaryImage = async (
  blobUrl: string,
  imageId: string,
  productId: string
) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    await deleteImageFromStore(blobUrl);

    const deleteResult = await sql`
      DELETE FROM product_images
      WHERE id = ${imageId}
      RETURNING id
      `;

    if (deleteResult.rowCount === 0) {
      throw new Error(
        "Failed to delete the secondary image. Image not found or mismatch."
      );
    }

    revalidatePath(`/products/${productId}`);
    revalidatePath(`/dashboard/products/images/edit/${productId}`);
    revalidatePath(`/dashboard/products/images`);
  } catch (error) {
    console.error("FAILED TO delete image: ", error);
    throw new Error("Failed to delete image");
  }
};
