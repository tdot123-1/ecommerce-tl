"use client";

import { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";

const ClearCart = () => {
  const { clearCart } = useShoppingCart();

  // clear cart from local storage on succesful payment. 
  useEffect(() => {
    console.log("CART CLEARED")
    clearCart();
    localStorage.removeItem("persist:root")
  }, [clearCart]);

  return (
    <h2 className="italic text-zinc-600 dark:text-zinc-300">
      Thank you for your purchase!
    </h2>
  );
};

export default ClearCart;