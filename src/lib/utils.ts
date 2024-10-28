import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItem, ValidationProduct } from "./types";
// import { stripe } from "./stripe";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};

export const validateCart = (
  inventory: ValidationProduct[],
  cartItems: CartItem[]
) => {
  console.log("VALIDATING CART")
  return cartItems.filter((cartItem) => {
    const matchingProduct = inventory.find(
      (product) => product.stripe_price_id === cartItem.stripe_price_id
    );
    return matchingProduct
      ? matchingProduct.stripe_product_id === cartItem.stripe_product_id
      : false;
  });
};

// export const getSession = async (sessionId: string) => {
//   const sessionData = await stripe.checkout.sessions.retrieve(sessionId);
//   console.log("session: ", sessionData);
// }
