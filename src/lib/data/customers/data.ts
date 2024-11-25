"use server";

import { sql } from "@vercel/postgres";

export const fetchOneCustomer = async (customerId: string) => {
  try {
    const data = await sql`
        UPDATE customers
        SET verified = true
        WHERE id = ${customerId}
        RETURNING name, stripe_customer_id
        `;

    if (!data.rowCount) {
      throw new Error("Customer not found");
    }

    return data.rows[0]

  } catch (error) {
    console.error("Error finding customer: ", error);
    throw new Error("Something went wrong retrieving customer");
  }
};
