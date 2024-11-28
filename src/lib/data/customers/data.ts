"use server";

import { sql } from "@vercel/postgres";

export const fetchOneCustomer = async (customerStripeId: string) => {
  try {
    const data = await sql`
    SELECT name, deleted 
    FROM customers
    WHERE stripe_customer_id = ${customerStripeId}
    LIMIT 1
    `;
    if (!data.rowCount) {
      throw new Error("Customer not found");
    }

    return data.rows[0];
  } catch (error) {
    console.error("Error finding customer: ", error);
    throw new Error("Something went wrong retrieving customer");
  }
};

export const fetchOneCustomerAndVerify = async (customerId: string) => {
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

    return data.rows[0];
  } catch (error) {
    console.error("Error finding customer: ", error);
    throw new Error("Something went wrong retrieving customer");
  }
};
