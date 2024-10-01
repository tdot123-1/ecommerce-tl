// import { db } from "@vercel/postgres";
// import { products } from "@/lib/placeholder-data";

// export async function GET() {
//   const client = await db.connect();

//   try {
//     await client.sql`BEGIN`;

//     const insertedProducts = await Promise.all(
//       products.map((product) => {
//         const sizesString = product.sizes.join(",");
//         return client.sql`
//                       INSERT INTO products (name, price, sizes, description, category, image_url)
//                       VALUES (${product.name}, ${product.price}, ${sizesString}, ${product.description}, ${product.category}, ${product.image_url})
//                       ON CONFLICT (id) DO NOTHING;
//                       `;
//       })
//     );
//     await client.sql`COMMIT`;

//     return Response.json({
//       message: "DB SEED SUCCESFUL",
//       inserted: insertedProducts.length,
//     });
//   } catch (error) {
//     await client.sql`ROLLBACK`;
//     console.error("ERROR SEEDING: ", error);
//     return Response.json({ message: "ERROR SEEDING" }, { status: 500 });
//   } finally {
//     await client.release();
//   }
// }
