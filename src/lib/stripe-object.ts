import Stripe from "stripe";

// check for key
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("missing stripe key");
}

// create stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
