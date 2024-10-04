"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";

const BasketContent = () => {
  const cart = useShoppingCart();
  const { cartCount, cartDetails, totalPrice, clearCart, removeItem } = cart;

  if (cartCount === 0) {
    return <p>Nothing here yet!</p>;
  }

  return (
    <div>
      <ul>
        {Object.entries(cartDetails!).map(([id, product]) => (
          <li key={id}>
            {product.name} - €{product.price / 100} x {product.quantity}
            <Button onClick={() => removeItem(id)}><TrashIcon /></Button>
          </li>
        ))}
      </ul>
      <p>Total: €{totalPrice! / 100}</p>
      <Button onClick={clearCart}>Clear Cart</Button>
    </div>
  );
};

export default BasketContent;
