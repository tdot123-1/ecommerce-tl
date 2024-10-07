"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import CheckoutButton from "./checkout-button";

const ItemsOverview = () => {
  const { cartDetails, removeItem, clearCart, cartCount } = useShoppingCart();

  if (cartCount === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p>Nothing here yet!</p>
      </div>
    );
  }
  
  return (
    <section>
      <h1>Your Basket Overview</h1>
      <div className="w-full">
        <ul className="w-1/4 my-auto">
          {Object.entries(cartDetails!).map(([id, product]) => (
            <li
              key={id}
              className="w-full flex justify-evenly items-center border-b border-zinc-400"
            >
              <p>{product.name}</p>
              <p>- €{product.price / 100}</p>
              <p>x {product.quantity}</p>
              <Button
                onClick={() => removeItem(id)}
                className="p-1"
                variant="default"
              >
                <TrashIcon size={16} />
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex justify-center gap-8 items-center">
        <Button onClick={clearCart}>Clear Cart</Button>
        <CheckoutButton />
      </div>
    </section>
  );
};

export default ItemsOverview;
