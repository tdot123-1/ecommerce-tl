"use client";

import { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";

const ClearCart = () => {
  const { clearCart } = useShoppingCart();

  // clear cart from local storage on successful payment
  useEffect(() => {
    // use setTimeout to defer the cart clearing logic and break the update loop
    const timeoutId = setTimeout(() => {
      clearCart(); // clear the cart
      localStorage.removeItem("persist:root"); // remove items from local storage
    }, 0); // defer execution to the next tick of the event loop

    // clean up timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [clearCart]); // keep `clearCart` as a dependency

  return (
    <h2 className="italic text-zinc-600 dark:text-zinc-300">
      Thank you for your purchase!
    </h2>
  );
};

export default ClearCart;
