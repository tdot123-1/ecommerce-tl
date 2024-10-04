"use client";

import { ReactNode } from "react";
import { CartProvider } from "use-shopping-cart";

interface CartProviderProps {
  children: ReactNode;
}

const stripe_pk = process.env.NEXT_PUBLIC_STRIPE_PK;

const CartProviderWrapper = ({ children }: CartProviderProps) => {
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={stripe_pk!}
      currency="EUR"
      shouldPersist={false}
    >
      {children}
    </CartProvider>
  );
};

export default CartProviderWrapper;
