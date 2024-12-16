"use server";

import { CreatedProduct } from "./types";
import { stripe } from "./stripe-object";

export const syncProductWithStripe = async (product: CreatedProduct) => {
  // check if product already has stripe id's
  let stripeProductId = product.stripe_product_id;
  let stripePriceId = product.stripe_price_id;

  let stripeProduct;
  // console.log("IMAGE FOR STRIPE: ", product.image_url)

  try {
    // create product only if product does not yet have stripe id
    if (!stripeProductId) {
      stripeProduct = await stripe.products.create({
        name: product.name,
        description: product.description,
        images: [product.image_url],
      });
      stripeProductId = stripeProduct.id;
    } else {
      stripeProduct = await stripe.products.update(stripeProductId, {
        name: product.name,
        description: product.description,
        images: [product.image_url],
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

export const updateStripeImage = async (
  stripe_product_id: string,
  imageUrl: string
) => {
  try {
    await stripe.products.update(stripe_product_id, {
      images: [imageUrl],
    });
  } catch (error) {
    console.error("ERROR UPDATING STRIPE IMAGE: ", error);
    throw new Error("Error updating stripe image");
  }
};

export const createStripeCustomer = async (name: string, email: string) => {
  try {
    const customer = await stripe.customers.create({
      name,
      email,
    });

    return customer.id;
  } catch (error) {
    console.error("ERROR CREATING STRIPE CUSTOMER: ", error);
    throw new Error("Error creating stripe customer");
  }
};

export const deleteStripeCustomer = async (stripe_customer_id: string) => {
  try {
    const deletedCustomer = await stripe.customers.del(stripe_customer_id);

    if (deletedCustomer.deleted) {
      return {
        success: true,
        message: `Customer ${stripe_customer_id} deleted.`,
      };
    } else {
      return {
        success: false,
        message: `Customer ${stripe_customer_id} not found`,
      };
    }
  } catch (error) {
    console.error("ERROR DELETING STRIPE CUSTOMER: ", error);
    throw new Error("Error deleting stripe customer");
  }
};

// get all sessions overview
export const getAllSessions = async (stripe_customer_id: string) => {
  try {
    const sessions = await stripe.checkout.sessions.list({
      customer: stripe_customer_id,
      limit: 10,
    });

    const allSessions = sessions.data.map((session) => ({
      sessionId: session.id,
      created: new Date(session.created * 1000).toLocaleDateString(),
      amountTotal: session.amount_total ? session.amount_total : null,
      discounts: session.total_details?.amount_discount || 0,
    }));

    return { sessions: allSessions, hasMore: sessions.has_more };
  } catch (error) {
    console.error("ERROR FETCHING PURCHASE HISTORY: ", error);
    throw new Error("Error fetching stripe payment intents");
  }
};

// get details on line items for one session
export const getOneSession = async (sessionId: string) => {
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

    const sessionItems = lineItems.data.map((item) => ({
      stripe_id: item.price?.product.toString() || "N/A",
      price: item.price?.unit_amount,
      quantity: item.quantity,
      description: item.description,
      discount: item.discounts || [],
    }));

    return sessionItems;
  } catch (error) {
    console.error("ERROR FETCHING LINE ITEMS: ", error);
    throw new Error(`Failed to fetch line items for session: ${sessionId}`);
  }
};

// fetch full purchase history (sessions + line items)
// export const getPurchaseHistory = async (stripe_customer_id: string) => {
//   try {
//     const sessions = await stripe.checkout.sessions.list({
//       customer: stripe_customer_id,
//       limit: 10,
//     });

//     const purchaseHistory = [];

//     for (const session of sessions.data) {
//       const lineItems = await stripe.checkout.sessions.listLineItems(
//         session.id
//       );

//       const items = lineItems.data.map((item) => ({
//         stripe_id: item.id,
//         quantity: item.quantity,
//         price: item.price?.unit_amount ? item.price.unit_amount : null,
//       }));

//       purchaseHistory.push({
//         sessionId: session.id,
//         amountTotal: session.amount_total ? session.amount_total : null,
//         created: new Date(session.created * 1000).toLocaleDateString(),
//         items,
//       });
//     }

//     return purchaseHistory;
//   } catch (error) {
//     console.error("ERROR FETCHING PURCHASE HISTORY: ", error);
//     throw new Error("Error fetching stripe payment intents");
//   }
// };
