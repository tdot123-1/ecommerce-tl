"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";

const BasketContent = () => {
  const cart = useShoppingCart();
  const { cartCount, cartDetails, totalPrice, clearCart } = cart;

  if (cartCount === 0) {
    return <p>Nothing here yet!</p>;
  }

  return (
    <div>
      <ul>
        {Object.entries(cartDetails!).map(([id, product]) => (
          <li key={id}>
            {product.name} - ${product.price / 100} x {product.quantity}
          </li>
        ))}
      </ul>
      <p>Total: ${totalPrice! / 100}</p>
      <Button onClick={clearCart}>Clear Cart</Button>
    </div>
  );
};

export default BasketContent;
