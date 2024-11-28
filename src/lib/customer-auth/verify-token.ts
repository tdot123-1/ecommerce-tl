"use server";

import jwt from "jsonwebtoken";
import { fetchOneCustomerAndVerify } from "../data/customers/data";

export async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const { userId } = decoded as { userId: string };

    const customer = await fetchOneCustomerAndVerify(userId);

    if (!customer.stripe_customer_id || !customer.name) {
      throw new Error("Customer id not found");
    }

    return {
      customerId: customer.stripe_customer_id,
      name: customer.name,
    };
  } catch (error) {
    console.error("Verification failed: ", error);
    return { error: "Invalid or expired token." };
  }
}
