// import { syncProductWithStripe } from "@/lib/stripe";
// import { Product } from "@/lib/types";
// import { QueryResult, sql } from "@vercel/postgres";
// import { NextResponse } from "next/server";

// add a new product to db
export async function POST(req: Request) {

  await req.json()

  return Response.json({ message: "Route currently unavailable" });

  // try {
  //   const { name, price, sizes, description, category, image_url } =
  //     await req.json();

  //   // insert product data into products table, return created product

  //   const product: QueryResult<Product> = await sql`
  //   INSERT INTO products (name, price, sizes, description, category, image_url)
  //   VALUES (${name}, ${price}, ${sizes}, ${description}, ${category}, ${image_url})
  //   RETURNING id, name, price, description, currency, stripe_product_id, stripe_price_id;
  //   `;

  //   // get price_id and product_id from stripe api

  //   const createdProduct = product.rows[0];

  //   const { stripeProductId, stripePriceId } = await syncProductWithStripe(
  //     createdProduct
  //   );

  //   // insert stripe id's into created product (for payment integration)

  //   const updatedProduct = await sql`
  //   UPDATE products
  //   SET stripe_product_id = ${stripeProductId}, stripe_price_id = ${stripePriceId}
  //   WHERE id = ${createdProduct.id}
  //   RETURNING *;
  //   `;

  //   // return created product

  //   return NextResponse.json({ product: updatedProduct.rows[0] });

  // } catch (error) {
  //   console.error("Error creating product: ", error);
  //   return NextResponse.json(
  //     { message: "Something went wrong" },
  //     { status: 500 }
  //   );
  // }
}
