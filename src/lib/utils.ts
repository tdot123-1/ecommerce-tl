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
  // console.log("VALIDATING CART");
  // filter through cart items to keep only validated items
  return cartItems.filter((cartItem) => {
    // find if price id exists in inventory
    const matchingProduct = inventory.find(
      (product) => product.stripe_price_id === cartItem.stripe_price_id
    );
    // check if found price id corresponds to correct product id
    return matchingProduct
      ? matchingProduct.stripe_product_id === cartItem.stripe_product_id
      : false;
  });
};

export const formatPrice = (priceInCents: number) => {
  return `€${(priceInCents / 100).toFixed(2)}`;
};

export const generatePagination = (
  totalPages: number,
  currentPage: number,
  mobile: boolean
) => {
  const pages: (number | "ellipsis")[] = [];

  // if 3 or fewer pages, display all numbers, return pages
  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  if (currentPage <= 2) {
    if (mobile) {
      pages.push(1, 2, "ellipsis");
    } else {
      pages.push(1, 2, 3, "ellipsis", totalPages);
    }
  } else if (currentPage >= totalPages - 1) {
    if (mobile) {
      pages.push("ellipsis", totalPages - 1, totalPages);
    } else {
      pages.push(1, "ellipsis", totalPages - 2, totalPages - 1, totalPages);
    }
  } else {
    if (mobile) {
      pages.push("ellipsis", currentPage, "ellipsis");
    } else {
      pages.push(
        "ellipsis",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "ellipsis"
      );
    }
  }

  return pages;
};

// export const getSession = async (sessionId: string) => {
//   const sessionData = await stripe.checkout.sessions.retrieve(sessionId);
//   console.log("session: ", sessionData);
// }
