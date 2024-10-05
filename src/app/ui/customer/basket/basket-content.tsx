"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";

const BasketContent = () => {
  const cart = useShoppingCart();
  const { cartCount, cartDetails, totalPrice, clearCart, removeItem } = cart;

  if (cartCount === 0) {
    return <span>Nothing here yet!</span>;
  }

  return (
    <div>
      <ul>
        {Object.entries(cartDetails!).map(([id, product]) => (
          <li
            key={id}
            className="flex justify-between items-center pb-1 border-b border-zinc-400 my-1"
          >
            <div className="w-20 h-20 relative">
              <Image className="rounded-lg" src={product.image!} alt={product.name} fill />
            </div>
            <p>{product.name}</p>
            <p>- €{product.price / 100}</p>
            <p>x {product.quantity}</p>
            <Button onClick={() => removeItem(id)} className="p-1">
              <TrashIcon size={14} />
            </Button>
          </li>
        ))}
      </ul>
      <p>Total: €{totalPrice! / 100}</p>
      <Button onClick={clearCart}>Clear Cart</Button>
    </div>
  );
};

export default BasketContent;
