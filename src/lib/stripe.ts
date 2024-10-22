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

  try {
    // create product only if product does not yet have stripe id
    if (!stripeProductId) {
      stripeProduct = await stripe.products.create({
        name: product.name,
        description: product.description,
      });
      stripeProductId = stripeProduct.id;
    } else {
      stripeProduct = await stripe.products.update(stripeProductId, {
        name: product.name,
        description: product.description,
      });
    }

    // create price only if product does not yet have price id from stripe
    if (!stripePriceId) {
      const stripePrice = await stripe.prices.create({
        product: stripeProductId,
        unit_amount: product.price,
        currency: (product.currency || "eur").toLowerCase(),
      });
      stripePriceId = stripePrice.id;
    } else {
      // fetch current price
      const currentPrice = await stripe.prices.retrieve(stripePriceId);

      // if something was editted in the current price, create new price on Stripe
      if (
        currentPrice.unit_amount !== product.price ||
        currentPrice.currency !== (product.currency || "eur").toLowerCase()
      ) {
        const newPrice = await stripe.prices.create({
          product: stripeProductId,
          unit_amount: product.price,
          currency: (product.currency || "eur").toLowerCase(),
        });

        // set new price id
        stripePriceId = newPrice.id;
      }
    }

    // return stripe id's
    return { stripeProductId, stripePriceId };
  } catch (error) {
    console.error("ERROR SYNCING WITH STRIPE: ", error);
    throw new Error("Error syncing with stripe");
  }
};

export const archiveStripeProduct = async (
  stripe_product_id: string,
  active: boolean
) => {
  try {
    await stripe.products.update(stripe_product_id, {
      active: active,
    });
  } catch (error) {
    console.error("ERROR ARCHIVING STRIPE PRODUCT: ", error);
    throw new Error("Error archiving stripe product");
  }
};
