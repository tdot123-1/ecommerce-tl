import Stripe from "stripe";
import { Product } from "./types";

// check for key
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("missing stripe key");
}

// create stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const syncProductWithStripe = async (product: Product) => {

  // check if product already has stripe id's
  let stripeProductId = product.stripe_product_id;
  let stripePriceId = product.stripe_price_id;

  let stripeProduct;

  // create product only if product does not yet have stripe id
  if (!stripeProductId) {
    stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
    });
    stripeProductId = stripeProduct.id;
  } else {
    stripeProduct = await stripe.products.update(stripeProductId!, {
      name: product.name,
      description: product.description,
    });
  }

  // create price only if product does not yet have price id from stripe
  if (!stripePriceId) {
    const stripePrice = await stripe.prices.create({
      product: stripeProductId,
      unit_amount: product.price,
      currency: product.currency || "eur",
    });
    stripePriceId = stripePrice.id;
  }

  // return stripe id's
  return { stripeProductId, stripePriceId };
};
