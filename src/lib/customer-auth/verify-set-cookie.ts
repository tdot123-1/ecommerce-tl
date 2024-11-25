"use server";

import jwt from "jsonwebtoken";
import { setCookie } from "../actions/cookies/actions";
import { fetchOneCustomer } from "../data/customers/data";

export async function verifyAndSetCookie(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const { userId } = decoded as { userId: string };

    const customer = await fetchOneCustomer(userId);

    // Set the cookie
    setCookie(customer.stripe_customer_id);

    return { message: `User ${customer.name} verified.` };
  } catch (error) {
    console.error("Verification failed: ", error);
    return { error: "Invalid or expired token." };
  }
}
