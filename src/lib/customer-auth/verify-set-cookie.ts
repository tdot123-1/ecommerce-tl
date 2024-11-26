"use server";

import jwt from "jsonwebtoken";
import { setCookie } from "../actions/cookies/actions";
import { fetchOneCustomer } from "../data/customers/data";

export async function verifyAndSetCookie(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const { userId } = decoded as { userId: string };

    const customer = await fetchOneCustomer(userId);

    // // set the cookie
    // await setCookie(customer.stripe_customer_id);

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId: customer.stripe_customer_id }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error("Unsuccesful response from api route");
    }

    return { message: `User ${customer.name} verified.` };
  } catch (error) {
    console.error("Verification failed: ", error);
    return { error: "Invalid or expired token." };
  }
}
